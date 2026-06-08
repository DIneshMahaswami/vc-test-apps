import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	TabbedDetailLayout, createReferenceField, createReferenceInput, recordRep,
	type ResourceActionDefs, type FieldSchema, SelectField, SelectInput, MoneyField, MoneyInput, AutoReferenceNumberInput, CardGrid, ReferenceLiveFilter, ChoicesLiveFilter, DateLiveFilter, MoneyLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { ShoppingCart } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, DateField, DateInput, AutocompleteInput, required} from "react-admin";
import { CustomersReferenceField, CustomersReferenceInput } from './customers.js';
import { QuotationsReferenceField, QuotationsReferenceInput } from './quotations.js';
import { ProductsReferenceField, ProductsReferenceInput } from './products.js';
import { Box } from '@mui/material';

export const RESOURCE = "sales_orders"
export const DETAIL_RESOURCES: string[] = ["sales_order_items"]
export const ICON = ShoppingCart
export const DETAIL_ICONS: any[] = [ShoppingCart]
export const PREFETCH: string[] = ["customers", "quotations"]
export const DETAIL_PREFETCH: string[][] = [[RESOURCE, "products"]]

const sales_ordersActionDefs: ResourceActionDefs = {};

export const statusChoices = [{ id: 'draft', name: 'Draft' }, { id: 'confirmed', name: 'Confirmed' }, { id: 'processing', name: 'Processing' }, { id: 'shipped', name: 'Shipped' }, { id: 'delivered', name: 'Delivered' }, { id: 'cancelled', name: 'Cancelled' }];
export const StatusChoiceField = (props: any) => <SelectField {...props} choices={statusChoices} />;
export const SalesOrdersReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const SalesOrdersReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
export const TotalAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="customer_id" reference="customers" label="Customer" />,
    <ReferenceLiveFilter source="quotation_id" reference="quotations" label="Quotation" />,
    <DateLiveFilter source="order_date" label="Order" />,
    <ChoicesLiveFilter source="status" label="Status" choiceLabels={statusChoices} show />,
    <MoneyLiveFilter source="total_amount" label="Total" currency="INR" />,
    <DateLiveFilter source="delivery_date" label="Delivery" />
]

export const SalesOrdersList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['total_amount', 'delivery_date']} >
                <DataTable.Col source="order_no" />
                <DataTable.Col source="customer_id" field={CustomersReferenceField}/>
                <DataTable.Col source="quotation_id" field={QuotationsReferenceField}/>
                <DataTable.Col source="order_date" field={DateField}/>
                <DataTable.Col source="status" field={StatusChoiceField} />
                <DataTable.Col source="total_amount" field={TotalAmountMoneyField}/>
                <DataTable.Col source="delivery_date" field={DateField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const SalesOrdersCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="order_no" variant='h6' />}>
                <CustomersReferenceField source="customer_id" />
                <QuotationsReferenceField source="quotation_id" />
            </CardGrid>
        </List>
    )
}

const DetailResources = (props: any) => (
    <TabbedDetailLayout {...props}>
        <SalesOrderItemsList resource={DETAIL_RESOURCES[0]}/>
    </TabbedDetailLayout>
)

const SalesOrderForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)}>
            <Box width="100%" display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap="1rem">
                
                <AutoReferenceNumberInput source="order_no" format="SAL-NNNN" />
                            <CustomersReferenceInput source="customer_id">
                                <AutocompleteInput validate={required()} />
                            </CustomersReferenceInput>
                            <QuotationsReferenceInput source="quotation_id" />
                            <DateInput source="order_date" validate={required()} />
                            <SelectInput source="status" choices={statusChoices} validate={required()} />
                            <MoneyInput source="total_amount" currency="INR" />
                            <DateInput source="delivery_date" />
            </Box>
            <DetailResources/>
        </SimpleForm>
    )
}

const SalesOrderCreate = (props: any) => {
    return (
        <Create {...createDefaults(props)}>
            <SalesOrderForm />
        </Create>
    )
}

const SalesOrderEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <SalesOrderForm/>
        </Edit>
    )
}

const SalesOrderShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <TextField source="order_no" />
                <CustomersReferenceField source="customer_id" />
                <QuotationsReferenceField source="quotation_id" />
                <DateField source="order_date" />
                <SelectField source="status" choices={statusChoices} />
                <MoneyField source="total_amount" currency="INR" />
                <DateField source="delivery_date" />
            </SimpleShowLayout>
            <DetailResources/>
        </Show>
    )
}

const sales_ordersFieldSchema: FieldSchema = {};

export const UnitPriceMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;
export const TaxAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;
// export const TotalAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;

const detail0Filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="sales_order_id" reference="sales_orders" label="Sales Order" />,
    <ReferenceLiveFilter source="product_id" reference="products" label="Product" />,
    <MoneyLiveFilter source="unit_price" label="Unit" currency="INR" />,
    <MoneyLiveFilter source="tax_amount" label="Tax" currency="INR" />,
    <MoneyLiveFilter source="total_amount" label="Total" currency="INR" />
]

const SalesOrderItemForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <SalesOrdersReferenceInput source="sales_order_id">
                <AutocompleteInput validate={required()} />
            </SalesOrdersReferenceInput>
            <ProductsReferenceInput source="product_id">
                <AutocompleteInput validate={required()} />
            </ProductsReferenceInput>
            <TextInput source="quantity" validate={required()} />
            <MoneyInput source="unit_price" currency="INR" />
            <MoneyInput source="tax_amount" currency="INR" />
            <MoneyInput source="total_amount" currency="INR" />
        </SimpleForm>
    )
}

export const SalesOrderItemsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(props)} hiddenColumns={['total_amount']} >
                <DataTable.Col source="sales_order_id" field={SalesOrdersReferenceField}/>
                <DataTable.Col source="product_id" field={ProductsReferenceField}/>
                <DataTable.Col source="quantity" />
                <DataTable.Col source="unit_price" field={UnitPriceMoneyField}/>
                <DataTable.Col source="tax_amount" field={TaxAmountMoneyField}/>
                <DataTable.Col source="total_amount" field={TotalAmountMoneyField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const SalesOrderItemsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<SalesOrdersReferenceField source="sales_order_id" variant='h6' link={false} />}>
                <ProductsReferenceField source="product_id" />
                <TextField source="quantity" />
            </CardGrid>
        </List>
    )
}

const SalesOrderItemCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <SalesOrderItemForm />
        </Create>
    )
}

const SalesOrderItemEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <SalesOrderItemForm />
        </Edit>
    )
}

const SalesOrderItemShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <SalesOrdersReferenceField source="sales_order_id" />
                <ProductsReferenceField source="product_id" />
                <TextField source="quantity" />
                <MoneyField source="unit_price" currency="INR" />
                <MoneyField source="tax_amount" currency="INR" />
                <MoneyField source="total_amount" currency="INR" />
            </SimpleShowLayout>
        </Show>
    )
}

export const SalesOrdersResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => record.order_no}
        fieldSchema={ sales_ordersFieldSchema}
        actionDefs={ sales_ordersActionDefs}
        filters={filters}
        filtersPlacement="top"
        list={<SalesOrdersList/>}
        create={<SalesOrderCreate/>}
        edit={<SalesOrderEdit/>}
        show={<SalesOrderShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<SalesOrdersCardList/>}
        hasColumnChooser
        sort={{ field: 'order_no', order: 'ASC' }}
    />
)

const salesOrderItemsActionDefs: ResourceActionDefs = {};

const salesOrderItemsFieldSchema: FieldSchema = {
    sales_order_id: { required: true, resource: 'sales_orders' },
    product_id: { required: true, resource: 'products' },
    quantity: { required: true },
    unit_price: { type: 'money', currency: 'INR' },
    tax_amount: { type: 'money', currency: 'INR' },
    total_amount: { type: 'money', currency: 'INR' }
};

const salesOrderItemsSearchableFields: string[] = [
    'quantity'
];

export const SalesOrderItemsResource = (
    <Resource
        name={DETAIL_RESOURCES[0]}
        icon={DETAIL_ICONS[0]}
        prefetch={DETAIL_PREFETCH[0]}
        recordRepresentation={(record: any) => `${recordRep(RESOURCE, record.sales_order)} ${recordRep('sales_orders', record.sales_order)}`}
        fieldSchema={salesOrderItemsFieldSchema}
        actionDefs={salesOrderItemsActionDefs}
        searchableFields={salesOrderItemsSearchableFields}
        sort={{ field: 'quantity', order: 'ASC' }}
        cardList={<SalesOrderItemsCardList/>}
        filters={detail0Filters}
        filtersPlacement="top"
        list={<SalesOrderItemsList/>}
        create={<SalesOrderItemCreate/>}
        edit={<SalesOrderItemEdit/>}
        show={<SalesOrderItemShow/>}
        hasDialog
        hasLiveUpdate
        hasColumnChooser
        hasFilterChooser
    />
)

export const SalesOrdersMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Sales Orders" leftIcon={<ICON />} />
)

export const SalesOrderItemsMenu = () => (
    <Menu.Item to={`/${DETAIL_RESOURCES[0]}`} primaryText="Sales Order Items" leftIcon={<ShoppingCart />} />
);
