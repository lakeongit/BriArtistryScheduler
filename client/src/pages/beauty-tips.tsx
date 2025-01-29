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
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BeautyTip {
  id: number;
  title: string;
  content: string;
  category: string;
  skinType?: string;
  hairType?: string;
  seasonality?: string;
  tags: string[];
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export default function BeautyTips() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSkinType, setSelectedSkinType] = useState<string>("all");
  const [selectedHairType, setSelectedHairType] = useState<string>("all");
  const [selectedSeason, setSelectedSeason] = useState<string>("all");

  const { data: beautyTips, isLoading } = useQuery<BeautyTip[]>({
    queryKey: ["/api/beauty-tips", selectedCategory, selectedSkinType, selectedHairType, selectedSeason],
  });

  const filteredTips = beautyTips?.filter((tip) => {
    if (selectedCategory !== "all" && tip.category !== selectedCategory) return false;
    if (selectedSkinType !== "all" && tip.skinType !== selectedSkinType) return false;
    if (selectedHairType !== "all" && tip.hairType !== selectedHairType) return false;
    if (selectedSeason !== "all" && tip.seasonality !== selectedSeason) return false;
    return true;
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

        <Tabs defaultValue="filters" className="w-full">
          <TabsList>
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="filters" className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="skincare">Skincare</SelectItem>
                  <SelectItem value="makeup">Makeup</SelectItem>
                  <SelectItem value="haircare">Hair Care</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSkinType} onValueChange={setSelectedSkinType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Skin Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skin Types</SelectItem>
                  <SelectItem value="dry">Dry</SelectItem>
                  <SelectItem value="oily">Oily</SelectItem>
                  <SelectItem value="combination">Combination</SelectItem>
                  <SelectItem value="sensitive">Sensitive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedHairType} onValueChange={setSelectedHairType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Hair Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hair Types</SelectItem>
                  <SelectItem value="straight">Straight</SelectItem>
                  <SelectItem value="wavy">Wavy</SelectItem>
                  <SelectItem value="curly">Curly</SelectItem>
                  <SelectItem value="coily">Coily</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Seasons</SelectItem>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="fall">Fall</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Set your preferences to receive more personalized beauty tips.
                </p>
                {/* Add preference settings here */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTips?.map((tip, index) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{tip.title}</CardTitle>
                  <Badge variant="secondary">{tip.category}</Badge>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {tip.tags?.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tip.content}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {tip.skinType && <span>Skin: {tip.skinType}</span>}
                  {tip.hairType && <span>• Hair: {tip.hairType}</span>}
                  {tip.seasonality && <span>• Season: {tip.seasonality}</span>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}