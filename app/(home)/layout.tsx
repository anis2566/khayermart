import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import { Navbar } from "@/components/header/navbar";
import { ModalProvider } from "@/components/providers/modal-provider";

const HomeLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <Header />
            <Navbar />
            {children}
            <Footer />
            <ModalProvider />
        </div>
    )
}

export default HomeLayout;