type OpenApiDocument = {
  paths?: Record<string, Record<string, any>>;
  servers?: Array<{ url: string }>;
};

const HTTP_METHODS = new Set([
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'options',
  'head',
  'trace',
]);

const toPascalCase = (value: string) =>
  value
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const toCamelCase = (value: string) => {
  const pascal = toPascalCase(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const removeVersionParameter = (parameters?: any[]) =>
  parameters?.filter((parameter) => parameter?.name !== 'v') ?? parameters;

const buildOperationId = (method: string, path: string) => {
  const segments = path.split('/').filter(Boolean);
  const apiIndex = segments.findIndex((segment) => segment === 'api');
  const controller = apiIndex >= 0 ? segments[apiIndex + 2] : segments[0];
  const action = apiIndex >= 0 ? segments[apiIndex + 3] : segments[1];

  if (controller && action) {
    return toCamelCase(`${controller} ${action}`);
  }

  return toCamelCase(`${method} ${segments.join(' ')}`);
};

export default function transformOpenApi(schema: OpenApiDocument) {
  const nextPaths: OpenApiDocument['paths'] = {};
  const usedOperationIds = new Set<string>();

  Object.entries(schema.paths ?? {}).forEach(([path, pathItem]) => {
    const nextPath = path.replace('/api/{v}/', '/api/1/');
    const nextPathItem: Record<string, any> = { ...pathItem };

    if (Array.isArray(nextPathItem.parameters)) {
      nextPathItem.parameters = removeVersionParameter(nextPathItem.parameters);
    }

    Object.entries(nextPathItem).forEach(([method, operation]) => {
      if (!HTTP_METHODS.has(method) || !operation) return;

      const baseOperationId = operation.operationId || buildOperationId(method, path);
      let operationId = baseOperationId;

      if (usedOperationIds.has(operationId)) {
        operationId = `${baseOperationId}${toPascalCase(method)}`;
      }

      let suffix = 2;
      while (usedOperationIds.has(operationId)) {
        operationId = `${baseOperationId}${toPascalCase(method)}${suffix}`;
        suffix += 1;
      }

      usedOperationIds.add(operationId);
      nextPathItem[method] = {
        ...operation,
        operationId,
        parameters: removeVersionParameter(operation.parameters),
      };
    });

    nextPaths[nextPath] = nextPathItem;
  });

  return {
    ...schema,
    servers: [{ url: '/' }],
    paths: nextPaths,
  };
}
