import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	TabbedDetailLayout, createReferenceField, createReferenceInput, recordRep,
	type ResourceActionDefs, type FieldSchema, SelectField, SelectInput, RadioButtonGroupInput, MoneyField, MoneyInput, RichTextField, RichTextInput, CardGrid, BooleanLiveFilter, ReferenceLiveFilter, ChoicesLiveFilter, MoneyLiveFilter, NumberLiveFilter, TextLiveFilter} from '@mahaswami/vc-frontend';
import { Apartment } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, BooleanField, BooleanInput, NumberField, NumberInput, AutocompleteInput, required, useUnique} from "react-admin";
import { Box } from '@mui/material';

export const RESOURCE = "properties"
export const DETAIL_RESOURCES: string[] = ["units"]
export const ICON = Apartment
export const DETAIL_ICONS: any[] = [Apartment]
export const PREFETCH: string[] = []
export const DETAIL_PREFETCH: string[][] = [[RESOURCE]]

export const PropertiesReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const PropertiesReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
export const UnitsReferenceField = createReferenceField(DETAIL_RESOURCES[0], DETAIL_PREFETCH[0]);
export const UnitsReferenceInput = createReferenceInput(DETAIL_RESOURCES[0], DETAIL_PREFETCH[0]);
const propertiesActionDefs: ResourceActionDefs = {};

export const propertyTypeChoices = [{ id: 'residential', name: 'Residential' }, { id: 'commercial', name: 'Commercial' }, { id: 'mixed_use', name: 'Mixed Use' }, { id: 'industrial', name: 'Industrial' }];
export const PropertyTypeChoiceField = (props: any) => <SelectField {...props} choices={propertyTypeChoices} />;

const filters = [
    <TextLiveFilter source="search" show />,
    <ChoicesLiveFilter source="property_type" label="Property Type" choiceLabels={propertyTypeChoices} show />
]

export const PropertiesList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)} hiddenColumns={['pin_code']} >
                <DataTable.Col source="name" />
                <DataTable.Col source="property_type" field={PropertyTypeChoiceField} />
                <DataTable.Col source="address_line_1" />
                <DataTable.Col source="city" />
                <DataTable.Col source="state" />
                <DataTable.Col source="pin_code" />
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const PropertiesCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="name" variant='h6' />}>
                <SelectField source="property_type" choices={propertyTypeChoices} />
                <TextField source="address_line_1" />
            </CardGrid>
        </List>
    )
}

const DetailResources = (props: any) => (
    <TabbedDetailLayout {...props}>
        <UnitsList resource={DETAIL_RESOURCES[0]}/>
    </TabbedDetailLayout>
)

const PropertyForm = (props: any) => {
    const unique = useUnique();
    return (
        <SimpleForm {...formDefaults(props)}>
            <Box width="100%" display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap="1rem">
                
                <TextInput source="name" validate={[required(), unique()]} />
                            <RadioButtonGroupInput source="property_type" choices={propertyTypeChoices} validate={required()} />
                            <TextInput source="address_line_1" />
                            <TextInput source="city" validate={required()} />
                            <TextInput source="state" />
                            <TextInput source="pin_code" />
                            <TextInput source="notes" multiline rows={5} />
            </Box>
            <DetailResources/>
        </SimpleForm>
    )
}

const PropertyCreate = (props: any) => {
    return (
        <Create {...createDefaults(props)}>
            <PropertyForm />
        </Create>
    )
}

const PropertyEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <PropertyForm/>
        </Edit>
    )
}

const PropertyShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <TextField source="name" />
                <SelectField source="property_type" choices={propertyTypeChoices} />
                <TextField source="address_line_1" />
                <TextField source="city" />
                <TextField source="state" />
                <TextField source="pin_code" />
                <TextField source="notes" />
            </SimpleShowLayout>
            <DetailResources/>
        </Show>
    )
}

const propertiesFieldSchema: FieldSchema = {
    name: { required: true, unique: true },
    property_type: { ui: 'radio', required: true, choices: propertyTypeChoices },
    address_line_1: {},
    city: { required: true },
    state: {},
    pin_code: {},
    notes: { ui: 'multiline' }
};

export const unitsStatusChoices = [{ id: 'available', name: 'Available' }, { id: 'reserved', name: 'Reserved' }, { id: 'occupied', name: 'Occupied' }, { id: 'under_maintenance', name: 'Under Maintenance' }];
export const UnitsStatusChoiceField = (props: any) => <SelectField {...props} choices={unitsStatusChoices} />;

export const UnitsRentPerSqftPriceMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;
export const UnitsMaintenancePerSqftPriceMoneyField = (props: any) => <MoneyField {...props} currency="INR" />;

const detail0Filters = [
    <TextLiveFilter source="search" show />,
    <ReferenceLiveFilter source="property_id" reference="properties" label="Property" />,
    <NumberLiveFilter source="sqft_number" label="Sqft" />,
    <MoneyLiveFilter source="rent_per_sqft_price" label="Rent Per Sqft" currency="INR" />,
    <MoneyLiveFilter source="maintenance_per_sqft_price" label="Maintenance Per Sqft" currency="INR" />,
    <ChoicesLiveFilter source="status" label="Status" choiceLabels={unitsStatusChoices} show />,
    <BooleanLiveFilter source="is_furnished" label="Furnished" />
]

const UnitForm = (props: any) => {
    const unique = useUnique();
    return (
        <SimpleForm {...formDefaults(props)} display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
            <PropertiesReferenceInput source="property_id">
                <AutocompleteInput validate={required()} />
            </PropertiesReferenceInput>
            <TextInput source="name" validate={[required(), unique()]} />
            <TextInput source="floor" />
            <NumberInput source="sqft_number" />
            <MoneyInput source="rent_per_sqft_price" currency="INR" />
            <MoneyInput source="maintenance_per_sqft_price" currency="INR" />
            <SelectInput source="status" choices={unitsStatusChoices} validate={required()} />
            <BooleanInput source="is_furnished" />
            <RichTextInput source="description" />
        </SimpleForm>
    )
}

export const UnitsList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(props)} hiddenColumns={['maintenance_per_sqft_price', 'status', 'is_furnished']} >
                <DataTable.Col source="property_id" field={PropertiesReferenceField}/>
                <DataTable.Col source="name" />
                <DataTable.Col source="floor" />
                <DataTable.Col source="sqft_number" field={NumberField}/>
                <DataTable.Col source="rent_per_sqft_price" field={UnitsRentPerSqftPriceMoneyField}/>
                <DataTable.Col source="maintenance_per_sqft_price" field={UnitsMaintenancePerSqftPriceMoneyField}/>
                <DataTable.Col source="status" field={UnitsStatusChoiceField} />
                <DataTable.Col source="is_furnished" field={BooleanField}/>
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const UnitsCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<PropertiesReferenceField source="property_id" variant='h6' link={false} />}>
                <TextField source="name" />
                <TextField source="floor" />
            </CardGrid>
        </List>
    )
}

const UnitCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <UnitForm />
        </Create>
    )
}

const UnitEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <UnitForm />
        </Edit>
    )
}

const UnitShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout display="grid"  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}  gap="1rem" >
                <PropertiesReferenceField source="property_id" />
                <TextField source="name" />
                <TextField source="floor" />
                <NumberField source="sqft_number" />
                <MoneyField source="rent_per_sqft_price" currency="INR" />
                <MoneyField source="maintenance_per_sqft_price" currency="INR" />
                <SelectField source="status" choices={unitsStatusChoices} />
                <BooleanField source="is_furnished" />
                <RichTextField source="description" />
            </SimpleShowLayout>
        </Show>
    )
}

export const PropertiesResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        fieldSchema={ propertiesFieldSchema}
        actionDefs={ propertiesActionDefs}
        filters={filters}
        filtersPlacement="top"
        list={<PropertiesList/>}
        create={<PropertyCreate/>}
        edit={<PropertyEdit/>}
        show={<PropertyShow/>}
        hasDialog
        hasLiveUpdate
        cardList={<PropertiesCardList/>}
        hasColumnChooser
        sort={{ field: 'name', order: 'ASC' }}
    />
)

const unitsActionDefs: ResourceActionDefs = {};

const unitsFieldSchema: FieldSchema = {
    property_id: { required: true, resource: 'properties' },
    name: { required: true, unique: true },
    floor: {},
    sqft_number: {},
    rent_per_sqft_price: { type: 'money', currency: 'INR' },
    maintenance_per_sqft_price: { type: 'money', currency: 'INR' },
    status: { ui: 'select', required: true, choices: unitsStatusChoices },
    is_furnished: {},
    description: { ui: 'rich', ai: true, uploads: { image: true, video: true } }
};

const unitsSearchableFields: string[] = [
    'name',
    'floor',
    'status'
];

export const UnitsResource = (
    <Resource
        name={DETAIL_RESOURCES[0]}
        icon={DETAIL_ICONS[0]}
        prefetch={DETAIL_PREFETCH[0]}
        recordRepresentation={(record: any) => `${recordRep(RESOURCE, record.property)} ${record.name}`}
        fieldSchema={unitsFieldSchema}
        actionDefs={unitsActionDefs}
        searchableFields={unitsSearchableFields}
        sort={{ field: 'name', order: 'ASC' }}
        cardList={<UnitsCardList/>}
        filters={detail0Filters}
        filtersPlacement="top"
        list={<UnitsList/>}
        create={<UnitCreate/>}
        edit={<UnitEdit/>}
        show={<UnitShow/>}
        hasDialog
        hasLiveUpdate
        hasColumnChooser
        hasFilterChooser
    />
)

export const PropertiesMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Properties 3rd" leftIcon={<ICON />} />
)

export const UnitsMenu = () => (
    <Menu.Item to={`/${DETAIL_RESOURCES[0]}`} primaryText="Units" leftIcon={<Apartment />} />
);
