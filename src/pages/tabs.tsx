import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import EmailList from '@/pages/emailList';


export function TabsDemo() {
  return (
    <div>
        <h1>Email to PO</h1>
        <Tabs defaultValue="pending">
            <TabsList>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processed">Processed</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
                <EmailList>
                    
                </EmailList>
            </TabsContent>
        </Tabs>
    </div>
  )
}
