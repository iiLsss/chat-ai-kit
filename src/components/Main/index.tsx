
import Sider from '@/components/Sider'
import Chat from '@/components/Chat'
// import VariableSizeList from '@/components/VirtualizedList/Chat'
import Layout from '@/components/Layout'


export default function Main() {
  return (
    <Layout 
      slider={
        <Sider />
      }
    >
      <Chat />
    </Layout>
  )
}
