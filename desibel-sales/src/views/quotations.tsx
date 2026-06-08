import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	TabbedDetailLayout, createReferenceField, createReferenceInput, recordRep,
	type ResourceActionDefs, type FieldSchema, SelectField, SelectInput, MoneyField, MoneyInput, AutoReferenceNumberInput, CardGrid, ReferenceLiveFilter, ChoicesLiveFilter, DateLiveFilter, MoneyLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { RequestQuote, Category} from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, DateField, DateInput, AutocompleteInput, required} from "react-admin";
import { CustomersReferenceField, CustomersReferenceInput } from './customers.js';
import { ProductsReferenceField, ProductsReferenceInput } from './products.js';
import { Box } from '@mui/material';

export const RESOURCE = "quotations"
export const DETAIL_RESOURCES: string[] = ["quotation_items"]
export const ICON = RequestQuote
export const DETAIL_ICONS: any[] = [Category]
export const PREFETCH: string[] = ["customers"]
export const DETAIL_PREFETCH: string[][] = [[RESOURCE, "products"]]

export const QuotationsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const QuotationsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
export const QuotationItemsReferenceField = createReferenceField(DETAIL_RESOURCES[0], DETAIL_PREFETCH[0]);
export const QuotationItemsReferenceInput = createReferenceInput(DETAIL_RESOURCES[0], DETAIL_PREFETCH[0]);
const quotationsActionDefs: ResourceActionDefs = {};

export const statusChoices = [{ id: 'draft', name: 'Draft' }, { id: 'sent', name: 'Sent' }, { id: 'approved', name: 'Approved' }, { id: 'rejected', name: 'Rejected' }, { id: 'expired', name: 'Expired' }];
export const StatusChoiceField = (props: any) => <SelectField {...props} choices={statusChoices} />;

export const TotalAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;

const filters = [
    <TextLiveFilter source="search" show />,
    <DateLiveFilter source="quotation_date" label="Quotation" />,
    <ReferenceLiveFilter source="customer_id" reference="customers" label="Customer" />,
    <ChoicesLiveFilter source="status" label="Status" choiceLabels={statusChoices} show />,
    <MoneyLiveFilter source="total_amount" label="Total" currency="INR" />
]

export const QuotationsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['total_amount']} >
                <DataTable.Col source="quotation_no" />
                <DataTable.Col source="quotation_date" field={DateField}/>
                <DataTable.Col source="customer_id" field={CustomersReferenceField}/>
                <DataTable.Col source="status" field={StatusChoiceField} />
                <DataTable.Col source="valid_until" />
                <DataTable.Col source="total_amount" field={TotalAmountMoneyField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const QuotationsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="quotation_no" variant='h6' />}>
                <DateField source="quotation_date" />
                <CustomersReferenceField source="customer_id" />
            </CardGrid>
        </List>
    )
}

const DetailResources = (props: any) => (
    <TabbedDetailLayout {...props}>
        <QuotationItemsList resource={DETAIL_RESOURCES[0]}/>
    </TabbedDetailLayout>
)

const QuotationForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)}>
            <Box width="100%" display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap="1rem">
                
                <AutoReferenceNumberInput source="quotation_no" format="QUO-NNNN" />
                            <DateInput source="quotation_date" validate={required()} />
                            <CustomersReferenceInput source="customer_id">
                                <AutocompleteInput validate={required()} />
                            </CustomersReferenceInput>
                            <SelectInput source="status" choices={statusChoices} validate={required()} />
                            <TextInput source="valid_until" />
                            <MoneyInput source="total_amount" currency="INR" />
                            <TextInput source="notes" multiline rows={5} />
            </Box>
            <DetailResources/>
        </SimpleForm>
    )
}

const QuotationCreate = (props: any) => {
    return (
        <Create {...createDefaults(props)}>
            <QuotationForm />
        </Create>
    )
}

const QuotationEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <QuotationForm/>
        </Edit>
    )
}

const QuotationShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <TextField source="quotation_no" />
                <DateField source="quotation_date" />
                <CustomersReferenceField source="customer_id" />
                <SelectField source="status" choices={statusChoices} />
                <TextField source="valid_until" />
                <MoneyField source="total_amount" currency="INR" />
                <TextField source="notes" />
            </SimpleShowLayout>
            <DetailResources/>
        </Show>
    )
}

const quotationsFieldSchema: FieldSchema = {
    quotation_no: { required: true, autoAssign: { format: 'QUO-NNNN' } },
    quotation_date: { required: true },
    customer_id: { required: true, resource: 'customers' },
    status: { ui: 'select', required: true, choices: statusChoices },
    valid_until: {},
    total_amount: { type: 'money', currency: 'INR' },
    notes: { ui: 'multiline' }
};

export const UnitPriceMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;
// export const TotalAmountMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;

const detail0Filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="quotation_id" reference="quotations" label="Quotation" />,
    <ReferenceLiveFilter source="product_id" reference="products" label="Product" />,
    <MoneyLiveFilter source="unit_price" label="Unit" currency="INR" />,
    <MoneyLiveFilter source="total_amount" label="Total" currency="INR" />
]

const QuotationItemForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <QuotationsReferenceInput source="quotation_id">
                <AutocompleteInput validate={required()} />
            </QuotationsReferenceInput>
            <ProductsReferenceInput source="product_id">
                <AutocompleteInput validate={required()} />
            </ProductsReferenceInput>
            <TextInput source="quantity" validate={required()} />
            <MoneyInput source="unit_price" currency="INR" validate={required()} />
            <TextInput source="discount_percentage" />
            <MoneyInput source="total_amount" currency="INR" />
        </SimpleForm>
    )
}

export const QuotationItemsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(props)} hiddenColumns={['total_amount']} >
                <DataTable.Col source="quotation_id" field={QuotationsReferenceField}/>
                <DataTable.Col source="product_id" field={ProductsReferenceField}/>
                <DataTable.Col source="quantity" />
                <DataTable.Col source="unit_price" field={UnitPriceMoneyField}/>
                <DataTable.Col source="discount_percentage" />
                <DataTable.Col source="total_amount" field={TotalAmountMoneyField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const QuotationItemsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<QuotationsReferenceField source="quotation_id" variant='h6' link={false} />}>
                <ProductsReferenceField source="product_id" />
                <TextField source="quantity" />
            </CardGrid>
        </List>
    )
}

const QuotationItemCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <QuotationItemForm />
        </Create>
    )
}

const QuotationItemEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <QuotationItemForm />
        </Edit>
    )
}

const QuotationItemShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <QuotationsReferenceField source="quotation_id" />
                <ProductsReferenceField source="product_id" />
                <TextField source="quantity" />
                <MoneyField source="unit_price" currency="INR" />
                <TextField source="discount_percentage" />
                <MoneyField source="total_amount" currency="INR" />
            </SimpleShowLayout>
        </Show>
    )
}

export const QuotationsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => record.quotation_no}
        fieldSchema={ quotationsFieldSchema}
        actionDefs={ quotationsActionDefs}
        filters={filters}
        filtersPlacement="top"
        list={<QuotationsList/>}
        create={<QuotationCreate/>}
        edit={<QuotationEdit/>}
        show={<QuotationShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<QuotationsCardList/>}
        hasColumnChooser
        sort={{ field: 'quotation_no', order: 'ASC' }}
    />
)

const quotationItemsActionDefs: ResourceActionDefs = {};

const quotationItemsFieldSchema: FieldSchema = {
    quotation_id: { required: true, resource: 'quotations' },
    product_id: { required: true, resource: 'products' },
    quantity: { required: true },
    unit_price: { type: 'money', currency: 'INR', required: true },
    discount_percentage: {},
    total_amount: { type: 'money', currency: 'INR' }
};

const quotationItemsSearchableFields: string[] = [
    'quantity',
    'discount_percentage'
];

export const QuotationItemsResource = (
    <Resource
        name={DETAIL_RESOURCES[0]}
        icon={DETAIL_ICONS[0]}
        prefetch={DETAIL_PREFETCH[0]}
        recordRepresentation={(record: any) => `${recordRep(RESOURCE, record.quotation)} ${recordRep('quotations', record.quotation)}`}
        fieldSchema={quotationItemsFieldSchema}
        actionDefs={quotationItemsActionDefs}
        searchableFields={quotationItemsSearchableFields}
        sort={{ field: 'quantity', order: 'ASC' }}
        cardList={<QuotationItemsCardList/>}
        filters={detail0Filters}
        filtersPlacement="top"
        list={<QuotationItemsList/>}
        create={<QuotationItemCreate/>}
        edit={<QuotationItemEdit/>}
        show={<QuotationItemShow/>}
        hasDialog
        hasLiveUpdate
        hasColumnChooser
        hasFilterChooser
    />
)

export const QuotationsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Quotations" leftIcon={<ICON />} />
)

export const QuotationItemsMenu = () => (
    <Menu.Item to={`/${DETAIL_RESOURCES[0]}`} primaryText="Quotation Items" leftIcon={<Category />} />
);
