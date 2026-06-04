import { Resource, createDefaults, tableDefaults,
	editDefaults, formDefaults, listDefaults,
	showDefaults, RowActions, DataTable, SimpleShowLayout, SimpleForm,
	type ResourceActionDefs, type FieldSchema, CardGrid, createReferenceField, createReferenceInput, TextLiveFilter} from '@mahaswami/vc-frontend';
import { Business } from '@mui/icons-material';
import { Create, Edit, List, Menu, Show,
    type ListProps, TextField, TextInput, required, useUnique} from "react-admin";

export const RESOURCE = "sites"
export const ICON = Business
export const PREFETCH: string[] = []

export const SitesReferenceField = createReferenceField(RESOURCE, PREFETCH);
export const SitesReferenceInput = createReferenceInput(RESOURCE, PREFETCH);
const sitesActionDefs: ResourceActionDefs = {};

const filters = [
    <TextLiveFilter source="search" show />
]

export const SitesList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)}>
            <DataTable {...tableDefaults(RESOURCE)}>
                <DataTable.Col source="name" />
                <RowActions/>
            </DataTable>
        </List>
    )
}

export const SitesCardList = (props: ListProps) => {
    return (
        <List {...listDefaults(props)} component={'div'}>
            <CardGrid title={<TextField source="name" variant='h6' />}>
            </CardGrid>
        </List>
    )
}

const SiteForm = (props: any) => {
    const unique = useUnique();
    return (
        <SimpleForm {...formDefaults(props)}>
            <TextInput source="name" validate={[required(), unique()]} />
            <TextInput source="notes" multiline rows={5} />
        </SimpleForm>
    )
}

const SiteEdit = (props: any) => {
    return (
        <Edit {...editDefaults(props)}>
            <SiteForm />
        </Edit>
    )
}

const SiteCreate = (props: any) => {
    return (
    	<Create {...createDefaults(props)}>
            <SiteForm />
        </Create>
    )
}

const SiteShow = (props: any) => {
    return (
        <Show {...showDefaults(props)}>
            <SimpleShowLayout>
                <TextField source="name" />
                <TextField source="notes" />
            </SimpleShowLayout>
        </Show>
    )
}

const sitesFieldSchema: FieldSchema = {
    name: { required: true, unique: true },
    notes: { ui: 'multiline' }
};
const sitesSearchableFields: string[] = [
    'name'
];

export const SitesResource = (
    <Resource
        name={RESOURCE}
        icon={ICON}
        prefetch={PREFETCH}
        fieldSchema={ sitesFieldSchema}
        actionDefs={ sitesActionDefs}
        searchableFields={ sitesSearchableFields}
        filters={filters}
        filtersPlacement="top"
        list={<SitesList/>}
        create={<SiteCreate/>}
        edit={<SiteEdit/>}
        show={<SiteShow/>}
        hasDialog
        hasLiveUpdate
        cardList={<SitesCardList/>}
        sort={{ field: 'name', order: 'ASC' }}
    />
)
export const SitesMenu = () => (
    <Menu.Item to={`/${RESOURCE}`} primaryText="Sites" leftIcon={<ICON />} />
)
