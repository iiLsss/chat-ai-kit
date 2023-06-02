import { ReactNode, PropsWithChildren } from "react"
import Header from '@/components/Header'
import MoreIcon from '@/assets/icon/more.svg'

type Props = {
  slider: string | ReactNode
}

const Layout: React.FC<PropsWithChildren<Props>> = (props) => {
  return (
    <>
      <Header />
      <section className="w-full h-[calc(100vh-56px)] flex">
        <section className="hidden md:block">
          {props.slider}
        </section>
        <div className="w-full h-full">
          {props.children}
        </div>
        <div>
          <MoreIcon className="w-6 h-6 text-gray-600" />
        </div>
      </section>
    </>
     
   
  )
}

export default Layout