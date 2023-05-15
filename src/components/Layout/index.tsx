import { ReactNode, PropsWithChildren } from "react"


type Props = {
  slider: string | ReactNode
}

const Layout: React.FC<PropsWithChildren<Props>> = (props) => {
  return (
    <section className="w-full h-[calc(100vh-56px)] flex">
      {props.slider}
      <div className="w-full h-full p-2">
        {props.children}
      </div>
    </section>
  )
}

export default Layout