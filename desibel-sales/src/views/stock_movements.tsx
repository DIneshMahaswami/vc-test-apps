import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, CardGrid, recordRep, createReferenceField, createReferenceInput, ReferenceLiveFilter, DateLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { MoveToInbox } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, DateField, DateInput, AutocompleteInput, required} from "react-admin";
import { ProductsReferenceField, ProductsReferenceInput } from './products.js';

export const RESOURCE = "stock_movements"
export const ICON = MoveToInbox
export const PREFETCH: string[] = ["products"]

export const StockMovementsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const StockMovementsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const stockMovementsActionDefs: ResourceActionDefs = {};

const filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="product_id" reference="products" label="Product" />,
    <DateLiveFilter source="movement_date" label="Movement" />
]

export const StockMovementsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)}>
                <DataTable.Col source="product_id" field={ProductsReferenceField}/>
                <DataTable.Col source="movement_date" field={DateField}/>
                <DataTable.Col source="movement_type" />
                <DataTable.Col source="quantity" />
                <DataTable.Col source="reference_no" />
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const StockMovementsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<ProductsReferenceField source="product_id" variant='h6' link={false} />}>
                <DateField source="movement_date" />
                <TextField source="movement_type" />
            </CardGrid>
        </List>
    )
}

const StockMovementForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <ProductsReferenceInput source="product_id">
                <AutocompleteInput validate={required()} />
            </ProductsReferenceInput>
            <DateInput source="movement_date" validate={required()} />
            <TextInput source="movement_type" validate={required()} />
            <TextInput source="quantity" validate={required()} />
            <TextInput source="reference_no" />
            <TextInput source="remarks" multiline rows={5} />
        </SimpleForm>
    )
}

const StockMovementEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <StockMovementForm />
        </Edit>
    )
}

const StockMovementCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <StockMovementForm />
        </Create>
    )
}

const StockMovementShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <ProductsReferenceField source="product_id" />
                <DateField source="movement_date" />
                <TextField source="movement_type" />
                <TextField source="quantity" />
                <TextField source="reference_no" />
                <TextField source="remarks" />
            </SimpleShowLayout>
        </Show>
    )
}

const stockMovementsFieldSchema: FieldSchema = {
    product_id: { required: true, resource: 'products' },
    movement_date: { required: true },
    movement_type: { required: true },
    quantity: { required: true },
    reference_no: {},
    remarks: { ui: 'multiline' }
};
const stockMovementsSearchableFields: string[] = [
    'product.product_name',
    'movement_type',
    'quantity',
    'reference_no'
];

export const StockMovementsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => recordRep('products', record.product)}
        fieldSchema={ stockMovementsFieldSchema}
        actionDefs={ stockMovementsActionDefs}
        searchableFields={ stockMovementsSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<StockMovementsList/>}
        create={<StockMovementCreate/>}
        edit={<StockMovementEdit/>}
        show={<StockMovementShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<StockMovementsCardList/>}
        sort={{ field: 'product.product_name', order: 'ASC' }}
    />
)
export const StockMovementsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Stock Movements" leftIcon={<ICON />} />
)
