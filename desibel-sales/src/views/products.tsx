import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	TabbedDetailLayout, createReferenceField, createReferenceInput, recordRep,
	type ResourceActionDefs, type FieldSchema, SelectField, SelectInput, MoneyField, MoneyInput, CardGrid, ReferenceLiveFilter, ChoicesLiveFilter, MoneyLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { Inventory, Category} from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, AutocompleteInput, required, useUnique} from "react-admin";
import { Box } from '@mui/material';

export const RESOURCE = "products"
export const DETAIL_RESOURCES: string[] = ["inventories"]
export const ICON = Inventory
export const DETAIL_ICONS: any[] = [Category]
export const PREFETCH: string[] = []
export const DETAIL_PREFETCH: string[][] = [[RESOURCE]]

export const ProductsReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const ProductsReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
export const InventoriesReferenceField = createReferenceField(DETAIL_RESOURCES[0], DETAIL_PREFETCH[0]);
export const InventoriesReferenceInput = createReferenceInput(DETAIL_RESOURCES[0], DETAIL_PREFETCH[0]);
const productsActionDefs: ResourceActionDefs = {};

export const categoryChoices = [{ id: 'electronics', name: 'Electronics' }, { id: 'furniture', name: 'Furniture' }, { id: 'office_supplies', name: 'Office Supplies' }, { id: 'software', name: 'Software' }, { id: 'services', name: 'Services' }];
export const CategoryChoiceField = (props: any) => <SelectField {...props} choices={categoryChoices} />;

export const UnitPriceMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ChoicesLiveFilter source="category" label="Category" choiceLabels={categoryChoices} show />,
    <MoneyLiveFilter source="unit_price" label="Unit" currency="INR" />
]

export const ProductsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)}>
                <DataTable.Col source="product_code" />
                <DataTable.Col source="product_name" />
                <DataTable.Col source="category" field={CategoryChoiceField} />
                <DataTable.Col source="unit_price" field={UnitPriceMoneyField}/>
                <DataTable.Col source="tax_percentage" />
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const ProductsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="product_code" variant='h6' />}>
                <TextField source="product_name" />
                <SelectField source="category" choices={categoryChoices} />
            </CardGrid>
        </List>
    )
}

const DetailResources = (props: any) => (
    <TabbedDetailLayout {...props}>
        <InventoriesList resource={DETAIL_RESOURCES[0]}/>
    </TabbedDetailLayout>
)

const ProductForm = (props: any) => {
    const unique = useUnique();
    return (
        <SimpleForm {...formDefaults(props)}>
            <Box width="100%" display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap="1rem">
                
                <TextInput source="product_code" validate={[required(), unique()]} />
                            <TextInput source="product_name" validate={[required(), unique()]} />
                            <SelectInput source="category" choices={categoryChoices} validate={required()} />
                            <MoneyInput source="unit_price" currency="INR" validate={required()} />
                            <TextInput source="tax_percentage" />
                            <TextInput source="description" multiline rows={5} />
            </Box>
            <DetailResources/>
        </SimpleForm>
    )
}

const ProductCreate = (props: any) => {
    return (
        <Create {...createDefaults(props)}>
            <ProductForm />
        </Create>
    )
}

const ProductEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <ProductForm/>
        </Edit>
    )
}

const ProductShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <TextField source="product_code" />
                <TextField source="product_name" />
                <SelectField source="category" choices={categoryChoices} />
                <MoneyField source="unit_price" currency="INR" />
                <TextField source="tax_percentage" />
                <TextField source="description" />
            </SimpleShowLayout>
            <DetailResources/>
        </Show>
    )
}

const productsFieldSchema: FieldSchema = {
    product_code: { required: true, unique: true },
    product_name: { required: true, unique: true },
    category: { ui: 'select', required: true, choices: categoryChoices },
    unit_price: { type: 'money', currency: 'INR', required: true },
    tax_percentage: {},
    description: { ui: 'multiline' }
};

const detail0Filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="product_id" reference="products" label="Product" />
]

const InventoryForm = (props: any) => {
    return (
        <SimpleForm {...formDefaults(props)}>
            <ProductsReferenceInput source="product_id">
                <AutocompleteInput validate={required()} />
            </ProductsReferenceInput>
            <TextInput source="warehouse_name" validate={required()} />
            <TextInput source="quantity_in_stock" validate={required()} />
            <TextInput source="reorder_level" />
            <TextInput source="last_stock_update" />
        </SimpleForm>
    )
}

export const InventoriesList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(props)}>
                <DataTable.Col source="product_id" field={ProductsReferenceField}/>
                <DataTable.Col source="warehouse_name" />
                <DataTable.Col source="quantity_in_stock" />
                <DataTable.Col source="reorder_level" />
                <DataTable.Col source="last_stock_update" />
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const InventoriesCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<ProductsReferenceField source="product_id" variant='h6' link={false} />}>
                <TextField source="warehouse_name" />
                <TextField source="quantity_in_stock" />
            </CardGrid>
        </List>
    )
}

const InventoryCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <InventoryForm />
        </Create>
    )
}

const InventoryEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <InventoryForm />
        </Edit>
    )
}

const InventoryShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout>
                <ProductsReferenceField source="product_id" />
                <TextField source="warehouse_name" />
                <TextField source="quantity_in_stock" />
                <TextField source="reorder_level" />
                <TextField source="last_stock_update" />
            </SimpleShowLayout>
        </Show>
    )
}

export const ProductsResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        recordRepresentation={(record: any) => record.product_code}
        fieldSchema={ productsFieldSchema}
        actionDefs={ productsActionDefs}
        filters={filters}
        filtersPlacement="top"
        list={<ProductsList/>}
        create={<ProductCreate/>}
        edit={<ProductEdit/>}
        show={<ProductShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
        cardList={<ProductsCardList/>}
        sort={{ field: 'product_name', order: 'ASC' }}
    />
)

const inventoriesActionDefs: ResourceActionDefs = {};

const inventoriesFieldSchema: FieldSchema = {
    product_id: { required: true, resource: 'products' },
    warehouse_name: { required: true },
    quantity_in_stock: { required: true },
    reorder_level: {},
    last_stock_update: {}
};

const inventoriesSearchableFields: string[] = [
    'warehouse_name',
    'quantity_in_stock',
    'reorder_level',
    'last_stock_update'
];

export const InventoriesResource = (
    <Resource
        name={DETAIL_RESOURCES[0]}
        icon={DETAIL_ICONS[0]}
        prefetch={DETAIL_PREFETCH[0]}
        recordRepresentation={(record: any) => `${recordRep(RESOURCE, record.product)} ${recordRep('products', record.product)}`}
        fieldSchema={inventoriesFieldSchema}
        actionDefs={inventoriesActionDefs}
        searchableFields={inventoriesSearchableFields}
        sort={{ field: 'warehouse_name', order: 'ASC' }}
        cardList={<InventoriesCardList/>}
        filters={detail0Filters}
        filtersPlacement="top"
        list={<InventoriesList/>}
        create={<InventoryCreate/>}
        edit={<InventoryEdit/>}
        show={<InventoryShow/>}
        hasDialog
        hasLiveUpdate
        hasFilterChooser
    />
)

export const ProductsMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Products" leftIcon={<ICON />} />
)

export const InventoriesMenu = () => (
    <Menu.Item to={`/${DETAIL_RESOURCES[0]}`} primaryText="Inventories" leftIcon={<Category />} />
);
