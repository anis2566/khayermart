import { AddressForm } from "@/components/account/address-form"
import { AddressList } from "@/components/account/address-list"

const Address = () => {
    return (
        <div className="space-y-6 px-4">
            <AddressList />
            <AddressForm />
        </div>
    )
}

export default Address