import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	TabbedDetailLayout, createReferenceField, createReferenceInput, recordRep,
	type ResourceActionDefs, type FieldSchema, MoneyField, MoneyInput, AutoReferenceNumberInput, CardGrid, ReferenceLiveFilter, DateLiveFilter, MoneyLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { ShoppingBag, ShoppingCart} from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, DateField, DateInput, AutocompleteInput, required} from "react-admin";
import { ProductsReferenceField, ProductsReferenceInput } from './products.js';

export const RESOURCE = "purchase_orders"
export const DETAIL_RESOURCES: string[] = ["purchase_order_items"]
export const ICON = ShoppingBag
export const DETAIL_ICONS: any[] = [ShoppingCart]
export const PREFETCH: string[] = []
export const DETAIL_PREFETCH: string[][] = [[RESOURCE, "products"]]

const purchase_ordersActionDefs: ResourceActionDefs = {};
export const PurchaseOrdersReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const PurchaseOrdersReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
export const TotalAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;

const filters = [
    <TextLiveFilter source="search" show />,
    <DateLiveFilter source="po_date" label="Po" />,
    <DateLiveFilter source="expected_delivery_date" label="Expected Delivery" />,
    <MoneyLiveFilter source="total_amount" label="Total" currency="INR" />
]

export const PurchaseOrdersList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)}>
                <DataTable.Col source="po_no" />
                <DataTable.Col source="supplier_name" />
                <DataTable.Col source="po_date" field={DateField}/>
                <DataTable.Col source="expected_delivery_date" field={DateField}/>
                <DataTable.Col source="total_amount" field={TotalAmountMoneyField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const PurchaseOrdersCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="po_no" variant='h6' />}>
                <TextField source="supplier_name" />
                <DateField source="po_date" />
            </CardGrid>
        </List>
    )
}

const DetailResources = (props: any) => (
    <TabbedDetailLayout {...props}>
        <PurchaseOrderItemsList resource={DETAIL_RESOURCES[0]}/>
    </TabbedDetailLayout>
)

const PurchaseOrderForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)}>
            <AutoReferenceNumberInput source="po_no" format="PUR-NNNN" />
            <TextInput source="supplier_name" validate={required()} />
            <DateInput source="po_date" validate={required()} />
            <DateInput source="expected_delivery_date" />
            <MoneyInput source="total_amount" currency="INR" />
            <DetailResources/>
        </SimpleForm>
    )
}

const PurchaseOrderCreate = (props: any) => {
    return (
        <Create {...createDefaults(props)}>
            <PurchaseOrderForm />
        </Create>
    )
}

const PurchaseOrderEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <PurchaseOrderForm/>
        </Edit>
    )
}

const PurchaseOrderShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout>
                <TextField source="po_no" />
                <TextField source="supplier_name" />
                <DateField source="po_date" />
                <DateField source="expected_delivery_date" />
                <MoneyField source="total_amount" currency="INR" />
            </SimpleShowLayout>
            <DetailResources/>
        </Show>
    )
}

const purchase_ordersFieldSchema: FieldSchema = {};

export const PurchasePriceMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;
export const PurchaseOrderItemTotalAmountField = (props: any) => <MoneyField {...props} currency="INR" />;

const detail0Filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="purchase_order_id" reference="purchase_orders" label="Purchase Order" />,
    <ReferenceLiveFilter source="product_id" reference="products" label="Product" />,
    <MoneyLiveFilter source="purchase_price" label="Purchase" currency="INR" />,
    <MoneyLiveFilter source="total_amount" label="Total" currency="INR" />
]

const PurchaseOrderItemForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)}>
            <PurchaseOrdersReferenceInput source="purchase_order_id">
                <AutocompleteInput validate={required()} />
            </PurchaseOrdersReferenceInput>
            <ProductsReferenceInput source="product_id">
                <AutocompleteInput validate={required()} />
            </ProductsReferenceInput>
            <TextInput source="quantity" validate={required()} />
            <MoneyInput source="purchase_price" currency="INR" validate={required()} />
            <MoneyInput source="total_amount" currency="INR" validate={required()} />
        </SimpleForm>
    )
}

export const PurchaseOrderItemsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(props)}>
                <DataTable.Col source="purchase_order_id" field={PurchaseOrderItemTotalAmountField}/>
                <DataTable.Col source="product_id" field={ProductsReferenceField}/>
                <DataTable.Col source="quantity" />
                <DataTable.Col source="purchase_price" field={PurchasePriceMoneyField}/>
                <DataTable.Col source="total_amount" field={TotalAmountMoneyField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const PurchaseOrderItemsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<PurchaseOrdersReferenceField source="purchase_order_id" variant='h6' link={false} />}>
                <ProductsReferenceField source="product_id" />
                <TextField source="quantity" />
            </CardGrid>
        </List>
    )
}

const PurchaseOrderItemCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <PurchaseOrderItemForm />
        </Create>
    )
}

const PurchaseOrderItemEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <PurchaseOrderItemForm />
        </Edit>
    )
}

const PurchaseOrderItemShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout>
                <PurchaseOrdersReferenceField source="purchase_order_id" />
                <ProductsReferenceField source="product_id" />
                <TextField source="quantity" />
                <MoneyField source="purchase_price" currency="INR" />
                <MoneyField source="total_amount" currency="INR" />
            </SimpleShowLayout>
        </Show>
    )
}

export const PurchaseOrdersResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => record.po_no}
        fieldSchema={ purchase_ordersFieldSchema}
        actionDefs={ purchase_ordersActionDefs}
        filters={filters}
        filtersPlacement="top"
        list={<PurchaseOrdersList/>}
        create={<PurchaseOrderCreate/>}
        edit={<PurchaseOrderEdit/>}
        show={<PurchaseOrderShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<PurchaseOrdersCardList/>}
        sort={{ field: 'po_no', order: 'ASC' }}
    />
)

const purchaseOrderItemsActionDefs: ResourceActionDefs = {};

const purchaseOrderItemsFieldSchema: FieldSchema = {
    purchase_order_id: { required: true, resource: 'purchase_orders' },
    product_id: { required: true, resource: 'products' },
    quantity: { required: true },
    purchase_price: { type: 'money', currency: 'INR', required: true },
    total_amount: { type: 'money', currency: 'INR', required: true }
};

const purchaseOrderItemsSearchableFields: string[] = [
    'quantity'
];

export const PurchaseOrderItemsResource = (
    <Resource
        name={DETAIL_RESOURCES[0]}
        icon={DETAIL_ICONS[0]}
        prefetch={DETAIL_PREFETCH[0]}
        recordRepresentation={(record: any) => `${recordRep(RESOURCE, record.purchase_order)} ${recordRep('purchase_orders', record.purchase_order)}`}
        fieldSchema={purchaseOrderItemsFieldSchema}
        actionDefs={purchaseOrderItemsActionDefs}
        searchableFields={purchaseOrderItemsSearchableFields}
        sort={{ field: 'quantity', order: 'ASC' }}
        cardList={<PurchaseOrderItemsCardList/>}
        filters={detail0Filters}
        filtersPlacement="top"
        list={<PurchaseOrderItemsList/>}
        create={<PurchaseOrderItemCreate/>}
        edit={<PurchaseOrderItemEdit/>}
        show={<PurchaseOrderItemShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
    />
)

export const PurchaseOrdersMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Purchase Orders" leftIcon={<ICON />} />
)

export const PurchaseOrderItemsMenu = () => (
    <Menu.Item to={`/${DETAIL_RESOURCES[0]}`} primaryText="Purchase Order Items" leftIcon={<ShoppingCart />} />
);
