import { ReactNode, PropsWithChildren } from "react"
import Header from '@/components/Header'


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
      </section>
    </>
     
   
  )
}

export default Layout