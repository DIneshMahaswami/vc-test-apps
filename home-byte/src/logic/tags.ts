import { remoteLog } from "@mahaswami/vc-frontend";
import { RESOURCE } from "../views/tags";

const afterDeleteCleanupTagReferences = async (params: any, dataProvider: any) => {
    const deletedTagId = params?.data?.id;
    const resourceDefinitions = window?.swanAppFunctions?.resourceDefinitions as any;

    if (!deletedTagId || !resourceDefinitions) {
        return params;
    }

    try {
        const bulkUpdateRequests = await buildTagReferenceUpdateRequests([deletedTagId], resourceDefinitions, dataProvider);
        console.log("After delete bulk request ", bulkUpdateRequests)
        if (bulkUpdateRequests.length > 0) {
            await dataProvider.executeBatch(bulkUpdateRequests);
        }
    } catch (error) {
        remoteLog("ERROR: While after delete Update tag references", error);
        return params;
    }

    return params;
}

const afterDeleteManyCleanupTagReferences = async (params: any, dataProvider: any) => {
    const deletedTagIds = params?.data;
    const resourceDefinitions = window?.swanAppFunctions?.resourceDefinitions as any;

    if (!deletedTagIds || deletedTagIds.length === 0 || !resourceDefinitions) {
        return params;
    }

    try {
        const bulkUpdateRequests = await buildTagReferenceUpdateRequests(deletedTagIds, resourceDefinitions, dataProvider);
        console.log("After delete many bulk request ", bulkUpdateRequests)

        if (bulkUpdateRequests.length > 0) {
            await dataProvider.executeBatch(bulkUpdateRequests);
        }
    } catch (error) {
        remoteLog("ERROR: While after delete many Update tag references", error);
        return params;
    }

    return params;
}

const buildTagReferenceUpdateRequests = async (
    deletedTagIds: any[],
    resourceDefinitions: any,
    dataProvider: any
) => {
    const bulkUpdateRequests: any[] = [];
    try {
        const tagResources: any[] = [];

        for (const resource of Object.keys(resourceDefinitions)) {
            const fieldSchema = resourceDefinitions[resource]?.fieldSchema;
            if (!fieldSchema) {
                continue;
            }

            for (const field of Object.keys(fieldSchema)) {
                if (fieldSchema[field]?.ui === "tags") {
                    tagResources.push({ resource, field });
                }
            }
        }

        if (tagResources.length === 0) {
            return bulkUpdateRequests;
        }

        for (const deletedTagId of deletedTagIds) {
            const bulkReferenceFetch = tagResources.map((tagResource) => ({
                type: "getList",
                resource: tagResource.resource,
                params: {
                    filter: {
                        [tagResource.field]: [deletedTagId],
                    },
                    meta: { columns: [tagResource.field] },
                    pagination: false
                },
            }));

            const { results } = await dataProvider.executeBatch(bulkReferenceFetch);
            console.log("Batch fetch results : ", results)
            for (const item of results) {
                const { request, data } = item;

                if (!data?.length) {
                    continue;
                }
                for (const record of data) {
                    // Finding the tag field
                    const tagField = Object.keys(record)?.find(key => key !== "id" && key?.endsWith("_ids")) as string;
                    const existingRequest = bulkUpdateRequests.find((req) =>
                        req.resource === request.resource &&
                        req.params.id === record.id
                    );
                    console.log("Existing request ", existingRequest);
                    if (existingRequest) {
                        // Updating the existing request to avoid duplicates.
                        const current = existingRequest.params.data[tagField] ?? record[tagField];
                        existingRequest.params.data[tagField] = current.filter((id: any) => id !== deletedTagId);
                    } else {
                        bulkUpdateRequests.push({
                            type: "update",
                            resource: request.resource,
                            params: {
                                id: record.id,
                                data: {
                                    [tagField]: record[tagField].filter(
                                        (id: any) => id !== deletedTagId
                                    ),
                                },
                            },
                        });
                    }
                }
            }
        }
    } catch (error) {
        remoteLog("ERROR: While building tag reference update requests", error);
    }

    return bulkUpdateRequests;
};

export const TagsLogic: any = {
    resource: RESOURCE,
    afterCreate: [],
    afterDelete: [afterDeleteCleanupTagReferences],
    afterDeleteMany: [afterDeleteManyCleanupTagReferences],
    afterGetList: [],
    afterGetMany: [],
    afterGetManyReference: [],
    afterGetOne: [],
    afterUpdate: [],
    afterUpdateMany: [],
    beforeCreate: [],
    beforeDelete: [],
    beforeDeleteMany: [],
    beforeGetList: [],
    beforeGetMany: [],
    beforeGetManyReference: [],
    beforeGetOne: [],
    beforeUpdate: [],
    beforeUpdateMany: [],
    beforeSave: [],
    afterRead: [],
    afterSave: [],
}
