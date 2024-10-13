import React, { useState, useContext, useEffect } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Divider } from '@mui/material';
import { useRouter } from 'next/router';
//import { TodoContext } from '../../context';
import theme from './theme';

/**
 * @class ListTemplateItem
 * @description This class is used to create the items that will be displayed in the list
 * @param {string} tag - The tag that wil be displayed in the list
 * @param {React.ComponentType} icon - The icon that will be displayed in the list
 * @param {string} redirection - The redirection that the tag will follow, must be blank if the tag contains subElements
 * @param {ListTemplateItem[]} subElements - The subElements that will be displayed when the tag is clicked
 */

export class ListTemplateItem {
    constructor({tag, icon, redirection, subElemnets}) {
        this.tag = tag;
        this.icon = icon;
        if (redirection) this.redirection = redirection;
        if (subElemnets) this.subElements = subElemnets;
    }

    // Métodos de la clase ListTemplateItem (sin cambios)
    getSubElements() {
        return this.subElements;
    }
    getIcon() {
        return this.icon;
    }
    getTag() {
        return this.tag;
    }
    getRedirection() {
        return this.redirection;
    }
    hasSubElements() {
        return this.subElements ? true : false;
    }
    setSubElements(subElements) {
        this.subElements = subElements;
    }
    setIcon(icon) {
        this.icon = icon;
    }
    setTag(tag) {
        this.tag = tag;
    }
    setRedirection(redirection) {
        this.redirection = redirection;
    }
    addSubElement(subElement) {
        if (subElement === null || subElement === undefined) throw new Error("The subElement cannot be null or undefined");
        if (typeof subElement !== "object") throw new Error("The subElement must be an object");
        if (subElement === this) throw new Error("The subElement cannot be the ListTemplateItem itself");
        if (this.subElements.includes(subElement)) throw new Error("The subElement is already in the subElements");
        if (!(subElement instanceof ListTemplateItem)) throw new Error("The subElement must be a ListTemplateItem");
        this.subElements.push(subElement);
        return true;
    }
    removeSubElement(subElement) {
        if (subElement === null || subElement === undefined) throw new Error("The subElement cannot be null or undefined");
        if (typeof subElement !== "object") throw new Error("The subElement must be an object");
        if (subElement === this) throw new Error("The subElement cannot be the ListTemplateItem itself");
        if (!this.subElements.includes(subElement)) throw new Error("The subElement is not in the subElements");
        if (!(subElement instanceof ListTemplateItem)) throw new Error("The subElement must be a ListTemplateItem");
        this.subElements = this.subElements.filter(sub => sub !== subElement);
        return true;
    }
}

// Componente para ítems simples que redirigen a otra página
const SimpleItemTemplate = ({ tag, icon, redirection }) => {
    const router = useRouter();
    //const { openSideBar, setOpenSideBar } = useContext(TodoContext);
    const route = router.pathname;

    return (
        <>
            <ListItem disableGutters disablePadding sx={{ display: 'block', bgcolor: route === redirection ? theme.palette.primary.light : theme.palette.background.paper }}>
                <ListItemButton 
                     sx={{
                        minHeight: 48,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    onClick={() => {
                        //setOpenSideBar(false);
                        router.push(redirection); // Usa el enrutador de Next.js para la redirección
                    }}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={tag} />
                </ListItemButton>
            </ListItem>
            <Divider/>
        </>
    );
};

// Componente para ítems con subelementos desplegables
const NestedItemTemplate = ({ tag, icon, subElements }) => {
    const [open, setOpen] = useState(false);
    //const { openSideBar, setOpenSideBar } = useContext(TodoContext);
    const route = useRouter().pathname;
    const [selected, setSelected] = useState(false);

    // useEffect(() => {
    //     if (!openSideBar) {
    //         setOpen(false);
    //     }
    // }, [openSideBar]);

    useEffect(() => {
        for (let element of subElements) {
            if (element.redirection === route) {
                setSelected(true);
                return;
            }
        }
        setSelected(false);
    }, [route, subElements]);

    return (
        <>  
            <ListItem disableGutters disablePadding sx={{ display: 'block', bgcolor: selected ? theme.palette.primary.light : theme.palette.background.paper }} onClick={() => setOpenSideBar(true)}>
                <ListItemButton 
                    onClick={() => setOpen(!open)}
                    sx={{
                        minHeight: 48,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={tag} />
                </ListItemButton>
            </ListItem>
            <Divider />
            <Collapse in={open} timeout="auto" unmountOnExit sx={{ pl: "16px" }}>
                {subElements.map((subElement, index) => (
                    <>
                        <SimpleItemTemplate key={`${tag}${index}`} tag={subElement.tag} icon={subElement.icon} redirection={subElement.redirection} />
                        <Divider />
                    </>
                ))}
            </Collapse>
        </>
    );
}

/**
 * Component to display a list of items in a sidebar
 * @param {ListTemplateItem[]} items - The items that will be displayed in the list
 * @returns {JSX.Element}
 * @example
 * <ListTemplate items={items} />
 */

export default function ListTemplate({ items }) {
    return(
        <List disablePadding>
            {items.map((item, index) =>
                item.hasSubElements() ?
                    <NestedItemTemplate key={`${item.getTag()}${index}`} tag={item.tag} icon={item.icon} subElements={item.getSubElements()} />
                    :
                    <SimpleItemTemplate key={`${item.getTag()}${index}`} tag={item.tag} icon={item.icon} redirection={item.redirection} />
            )}
        </List>
    );
}
