import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <main className="container mx-auto p-8">
      <Button variant="ghost" className="mb-8" disabled>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Posts
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
