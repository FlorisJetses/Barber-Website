import Draggable from "react-draggable";
import ReactDOM from "react-dom";
import { showMessage } from "../../JanDeKapper";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


let cards = [];

export const AddItemCard = (items, url, user) => {
    const cardHolder = document.getElementById("card-holder");
    const card = ItemCard(items, url, user);
    cards.push(card);

    ReactDOM.render(
        cards.map((card) => {
            return card;
        }),
        cardHolder
    );
};

const getPropValue = (type, value) => {
    if (type.includes("date"))
        value = new Date(value).getTime();
    else if (!isNaN(value))
        value = parseFloat(value);

    return value;
}

const getTop = childNode => {
    for (let i = 0; i < 1; i++) {

        if (!childNode)
            return null

        if (childNode.className != null)
            if (childNode.className.toString().includes("top-node"))
                return childNode;

        childNode = childNode.parentNode;
        i--;
    }
}

const getItem = (item, props) => {
    let field = item[1];
    let type = item[2];

    if (typeof type == "string")
        return (
            <input
                type={type}
                id={field}
                className="border"
                onChange={e => {
                    props[field] = getPropValue(type, e.target.value);
                }}
            />
        )
    else if (typeof type == "object")
        return (
            <select
            className="border"
            onChange={e => props[field] = e.target.value}
        >
            {type.map(value => {
                return (
                    <option value={value[1]}>{value[0]}</option>
                );
            })}
        </select>
        )
}

const ItemCard = (items, func, user) => {
    let props = {};

    if (!user?.token)
        return (<></>)

    return (
        <Draggable>
            <div className="bg-gray-100 shadow-md rounded-lg p-8 m-3 top-node flex flex-col items-center space-y-3">
                <div className="items-center flex">
                    <h1>Nieuw item</h1>
                        <IconButton onClick={e => getTop(e.target).remove()} sx={{marginLeft: 3}}>
                            <CloseIcon />
                        </IconButton>                        
                    
                </div>
                <div className="flex flex-col p-3">
                    {items.map((item) => {
                        return (<>
                            <label htmlFor={item[0]}>{item[0]}</label>
                            {getItem(item, props)}
                        </>)
                    })}
                </div>
                <Button
                variant="contained"
                    className="button"
                    onClick={() => {
                        func(props, user.token).then(result => {
                            if (result.status === "success")
                                showMessage("Item succesvol aangemaakt.", false);
                            else
                                showMessage("Kon item niet aanmaken.", true);
                        });
                    }}
                >
                    Toevoegen
                </Button>
            </div>
        </Draggable>
    );
};
