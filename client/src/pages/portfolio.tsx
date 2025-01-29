import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  "All",
  "Bridal",
  "Special Event",
  "Hair Styling",
  "Makeup"
];

export default function Portfolio() {
  const { data: portfolio, isLoading } = useQuery({
    queryKey: ["/api/portfolio"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Our Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="w-full h-48" />
                <Skeleton className="h-4 w-3/4 mt-4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const filteredPortfolio = (category: string) =>
    portfolio?.filter(
      (item: any) => category === "All" || item.portfolioItem.category === category
    );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Portfolio</h1>
      
      <Tabs defaultValue="All" className="mb-8">
        <TabsList className="inline-flex w-full overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="min-w-[100px]">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPortfolio(category)?.map((item: any) => (
                <Dialog key={item.portfolioItem.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <AspectRatio ratio={4/3}>
                          <img
                            src={item.portfolioItem.imageUrl}
                            alt={item.portfolioItem.title}
                            className="object-cover rounded-md w-full h-full"
                          />
                        </AspectRatio>
                        <h3 className="font-semibold mt-4">{item.portfolioItem.title}</h3>
                        <p className="text-sm text-gray-500">By {item.stylist.name}</p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{item.portfolioItem.title}</DialogTitle>
                      <DialogDescription>
                        By {item.stylist.name}, {item.stylist.title}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <AspectRatio ratio={16/9}>
                        <img
                          src={item.portfolioItem.imageUrl}
                          alt={item.portfolioItem.title}
                          className="object-cover rounded-lg w-full h-full"
                        />
                      </AspectRatio>
                      <p className="mt-4 text-gray-600">
                        {item.portfolioItem.description}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
