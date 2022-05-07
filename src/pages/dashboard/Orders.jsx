import React from "react";
import { Header } from "../../components/Header";
import { OrderTable } from "../../components/OrderTable.jsx";


 const OrdersBody = () => {

    return(
        <div>
            <div>
                <div className="flex flex-row items-center my-3">
                    <h1 className="text-3xl font-semibold ml-5">Transacties</h1>
                    {/* <input
                        type="text"
                        placeholder="Search.."
                        className="border bg-gray-200 rounded-full h-8 placeholder-gray-500 pl-2 mx-5"
                    /> */}
                    <button className="text-black px-3 py-2 rounded-full bg-yellow-500 ml-auto mr-8">
                        + Voeg toe
                    </button>
                </div>
                <OrderTable />
            </div>
        </div>
    );
};

export function Orders () {
    return (
        <Header title="Transacties" body={OrdersBody()} />
    )
}