
import { HistoryMenu, HistoryResource } from './views/history.tsx';
import { UsersMenu, UsersResource } from './views/users.tsx';
import { DocumentTemplatesMenu, DocumentTemplatesResource } from './views/document_templates.tsx';
import { DigitalSignaturesResource } from './views/digital_signatures.tsx';
import { isHistoryModuleActive, isDocumentGenerationModuleActive, AutoLayoutMenu, NestedMenu } from '@mahaswami/vc-frontend';
import GearIcon from '@mui/icons-material/Settings';
import { PropertiesResource, PropertiesMenu, UnitsResource, UnitsMenu} from './views/properties.tsx';
import { CustomersResource, CustomersMenu } from './views/customers.tsx';
import { RentalAgreementsResource, RentalAgreementsMenu } from './views/rental_agreements.tsx';
import { LeadsResource, LeadsMenu } from './views/leads.tsx';
import { InvoicesResource, InvoicesMenu } from './views/invoices.tsx';
import { PaymentsResource, PaymentsMenu } from './views/payments.tsx';
import { ContractorsResource, ContractorsMenu } from './views/contractors.tsx';
import { ServiceRequestsResource, ServiceRequestsMenu } from './views/service_requests.tsx';
import { WorkOrdersResource, WorkOrdersMenu } from './views/work_orders.tsx';
import { Route } from 'react-router-dom';
import { CustomRoutes} from "react-admin";
import {
    Card,
    CardContent,
    Typography,
    Divider,
    Stack,
    Box,
    Link,
} from "@mui/material";
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { TagsResource, TagsMenu } from './views/tags.tsx';


export const isTagModuleActive = () => {
    const resourceDefinitions = window.swanAppFunctions.resourceDefinitions;
    if (!resourceDefinitions) return false;
    const resources = Object.keys(resourceDefinitions);
    for (const resource of resources) {
        const fieldSchema = resourceDefinitions[resource].fieldSchema;
        if (!fieldSchema) continue;
        for (const field in fieldSchema) {
            if (fieldSchema[field]?.ui === "tags") {
                return true;
            }
        }
    }
    return false;
}

export default function AboutPage() {
    return (
        <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
            <Card>
                <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                        <HolidayVillageIcon color="primary" sx={{ fontSize: 48 }} />
                        <Box>
                            <Typography variant="h4" fontWeight={600}>
                                Welcome to Home Byte
                            </Typography>
                            <Typography color="text.secondary">
                                Smart Real Estate Solutions
                            </Typography>
                        </Box>
                    </Stack>

                    <Divider sx={{ mb: 3 }} />

                    <Typography paragraph>
                        Home Byte is a modern real estate company dedicated to helping
                        individuals and families find their perfect home with confidence.
                    </Typography>

                    <Typography paragraph>
                        We offer a wide range of residential and commercial properties,
                        from apartments and villas to office spaces and investment
                        opportunities.
                    </Typography>

                    <Typography paragraph>
                        Our experienced team provides transparent guidance throughout
                        every stage of buying, selling, or renting a property.
                    </Typography>

                    <Typography paragraph>
                        With market insights, trusted advice, and a customer-first
                        approach, we make real estate simple, secure, and stress-free.
                    </Typography>

                    <Typography paragraph>
                        Whether you're a first-time homebuyer, an investor, or looking
                        for your next rental, Home Byte is here to help you make the
                        right decision.
                    </Typography>

                    <Typography paragraph>
                        Explore quality properties, connect with our experts, and start
                        your journey toward finding the perfect place to call home.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Link href="/#/login" underline="hover">
                        Sign in to continue →
                    </Link>
                </CardContent>
            </Card>
        </Box>
    );
}

export const configureResources = (_permissions: any) => {
    let result = [
          <CustomRoutes noLayout>
            <Route path="/about" element={<AboutPage />} />
        </CustomRoutes>,
        HistoryResource,
        UsersResource,
        DocumentTemplatesResource,
        DigitalSignaturesResource,
        PropertiesResource,
        UnitsResource,
        CustomersResource,
        RentalAgreementsResource,
        LeadsResource,
        InvoicesResource,
        PaymentsResource,
        ContractorsResource,
        ServiceRequestsResource,
        WorkOrdersResource,
        TagsResource,

    ]

    return result;
}

export const configureMenus = (permissions: any) => {

    //TODO: This could be done in a less verbose way by having a hash and use React.createElement style

        const superAdminMenus =
        <>
        </>

        const adminMenusAll =
        <>
            <AutoLayoutMenu>

                <PropertiesMenu />
                <UnitsMenu />
                <CustomersMenu />
                <RentalAgreementsMenu />
                <LeadsMenu />
                <InvoicesMenu />
                <PaymentsMenu />
                <ContractorsMenu />
                <ServiceRequestsMenu />
                <WorkOrdersMenu />
                <NestedMenu label="Settings" icon={<GearIcon />} defaultOpen={false}>
                    {isDocumentGenerationModuleActive() && <DocumentTemplatesMenu />}
                    {isHistoryModuleActive() && <HistoryMenu />}
                    {isTagModuleActive() && <TagsMenu />}
                    <UsersMenu />
                </NestedMenu>

            </AutoLayoutMenu>
        </>

        if ('super_admin' === permissions) {
            return superAdminMenus;
        }
        if ('admin' === permissions) {
            return adminMenusAll;
        }
        return adminMenusAll;

}

export const configureLandingPage = (_permissions: any) => {
    return {
        "unauthenticated": "/about",
        "super_admin": "/tenants"
    }
}