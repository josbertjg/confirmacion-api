interface UpdateQueryProps {
  tableName: string,
  data: object,
  where: string
}

export const prepareUpdateQuery = ({tableName, data, where}: UpdateQueryProps): {query: string, params: any[]} => {
  let query: string = "UPDATE " + tableName + " SET ";
  let params: any[] = [];

  const entries = Object.entries(data);
  entries.forEach(([key, value], index) => {
    query += `${key} = ?`;
    params.push(value);

    if(!!entries[index+1]) query += ", ";
    else query += " ";
  });
 

  query += where

  return {query, params};
}