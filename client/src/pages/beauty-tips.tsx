import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BeautyTip {
  id: number;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
}

export default function BeautyTips() {
  const { data: beautyTips, isLoading } = useQuery<BeautyTip[]>({
    queryKey: ["/api/beauty-tips"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-[250px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Your Beauty Tips Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Personalized beauty advice and tips tailored just for you.
        </p>
        <div className="flex gap-4 mb-8">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="skincare">Skincare</SelectItem>
              <SelectItem value="makeup">Makeup</SelectItem>
              <SelectItem value="haircare">Hair Care</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Refresh Tips</Button>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {beautyTips?.map((tip, index) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tip.content}</p>
                {tip.imageUrl && (
                  <img
                    src={tip.imageUrl}
                    alt={tip.title}
                    className="mt-4 rounded-lg w-full h-48 object-cover"
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
