import {serverClient} from "@/app/_trpc/serverClient";
import Cart from "@/app/components/Cart";
import Card from "@/app/components/uiComponents/Card";
import Navigation from "@/app/components/Navigation";


const Page = async () => {

    const cartRes = await serverClient.cart.getUserCart()

    return (
        <section className={"relative"}>
            <Navigation url={'/'} text={"To Shop"}/>
            <Card title={"Your Cart"}>
                <Cart cartItem={cartRes}/>
            </Card>
        </section>
    );
};

export default Page;