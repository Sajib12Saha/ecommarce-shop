import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"

interface Props {
    tabValue:string;
}

export const UserOrderList = ({tabValue}:Props) => {
    return (
            <TabsContent value={tabValue} className="space-y-4">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">My Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-semibold">Order #12345</p>
                      <p className="text-sm text-muted-foreground">Placed on Aug 25, 2025</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
    )
}