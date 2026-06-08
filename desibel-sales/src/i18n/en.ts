import { TranslationMessages } from 'react-admin';
import { englishMessages, defineCatalog } from '@mahaswami/vc-frontend';

const customEnglishMessages = defineCatalog(englishMessages, {
    resources: {
        history: {
            name: 'History',
        },
        users: {
            name: 'Users',
        },
        settings: {
            name: 'Settings',
        },            
        // customers: {
        //     name: 'Customer |||| Customers',
        //     fields: {
        //         orders: 'Orders',
        //         first_seen: 'First seen',
        //         full_name: 'Name',
        //         groups: 'Segments',
        //         last_seen: 'Last seen',
        //         last_seen_gte: 'Visited Since',
        //         name: 'Name',
        //         total_spent: 'Total spent',
        //         password: 'Password',
        //         confirm_password: 'Confirm password',
        //         stateAbbr: 'State',
        //     },
        //     filters: {
        //         last_visited: 'Last visited',
        //         today: 'Today',
        //         this_week: 'This week',
        //         last_week: 'Last week',
        //         this_month: 'This month',
        //         last_month: 'Last month',
        //         earlier: 'Earlier',
        //         has_ordered: 'Has ordered',
        //         has_newsletter: 'Has newsletter',
        //         group: 'Segment',
        //     },
        //     fieldGroups: {
        //         identity: 'Identity',
        //         address: 'Address',
        //         stats: 'Stats',
        //         history: 'History',
        //         password: 'Password',
        //         change_password: 'Change Password',
        //     },
        //     page: {
        //         delete: 'Delete Customer',
        //     },
        //     errors: {
        //         password_mismatch:
        //             'The password confirmation is not the same as the password.',
        //     },
        //     notifications: {
        //         created:
        //             'Customer created |||| %{smart_count} customers created',
        //         updated:
        //             'Customer updated |||| %{smart_count} customers updated',
        //         deleted:
        //             'Customer deleted |||| %{smart_count} customers deleted',
        //     },
        // },
        employees: {
            name: "Employees",
            fields: {
                employee_code: "Employee Code",
                first_name: "First Name",
                last_name: "Last Name",
                email: "Email",
                phone: "Phone",
                joining_date: "Joining Date",
                is_active: "Is Active"
            }
        },
        customers: {
            name: "Customers",
            fields: {
                customer_name: "Customer Name",
                customer_type: "Customer Type",
                contact_person: "Contact Person",
                phone: "Phone",
                email: "Email",
                gstin: "Gstin",
                address_line_1: "Address Line 1",
                city: "City",
                state: "State",
                pin_code: "Pin Code",
                notes: "Notes"
            },
            choices: {
                customer_type: {
                    individual: "Individual",
                    business: "Business",
                    government: "Government"
                }
            }
        },
        products: {
            name: "Products"
        },
        inventories: {
            name: "Inventories"
        },
        leads: {
            name: "Leads",
            fields: {
                customer_name: "Customer Name",
                company_name: "Company Name",
                phone: "Phone",
                email: "Email",
                lead_source: "Lead Source",
                assigned_employee_id: "Assigned Employee Id",
                status: "Status",
                expected_value: "Expected Value",
                notes: "Notes"
            },
            choices: {
                status: {
                    new: "New",
                    contacted: "Contacted",
                    qualified: "Qualified",
                    proposal_sent: "Proposal Sent",
                    negotiation: "Negotiation",
                    won: "Won",
                    lost: "Lost"
                }
            }
        },
        quotations: {
            name: "Quotations"
        },
        quotation_items: {
            name: "Quotation Items"
        },
        sales_orders: {
            name: "Sales Orders"
        },
        sales_order_items: {
            name: "Sales Order Items"
        },
        invoices: {
            name: "Invoices",
            fields: {
                invoice_no: "Invoice No",
                invoice_date: "Invoice Date",
                sales_order_id: "Sales Order Id",
                payment_status: "Payment Status",
                due_date: "Due Date",
                total_amount: "Total Amount"
            },
            choices: {
                payment_status: {
                    pending: "Pending",
                    partially_paid: "Partially Paid",
                    paid: "Paid",
                    overdue: "Overdue"
                }
            }
        },
        payments: {
            name: "Payments",
            fields: {
                invoice_id: "Invoice Id",
                payment_date: "Payment Date",
                payment_method: "Payment Method",
                payment_reference: "Payment Reference",
                payment_amount: "Payment Amount"
            },
            choices: {
                payment_method: {
                    cash: "Cash",
                    cheque: "Cheque",
                    bank_transfer: "Bank Transfer",
                    upi: "UPI",
                    credit_card: "Credit Card"
                }
            }
        },
        purchase_orders: {
            name: "Purchase Orders"
        },
        purchase_order_items: {
            name: "Purchase Order Items"
        },
        stock_movements: {
            name: "Stock Movements",
            fields: {
                product_id: "Product Id",
                movement_date: "Movement Date",
                movement_type: "Movement Type",
                quantity: "Quantity",
                reference_no: "Reference No",
                remarks: "Remarks"
            }
        },
        sales_targets: {
            name: "Sales Targets",
            fields: {
                employee_id: "Employee Id",
                target_month: "Target Month",
                target_amount: "Target Amount",
                achieved_amount: "Achieved Amount"
            }
        }
    },
}) as TranslationMessages;

export default customEnglishMessages;
