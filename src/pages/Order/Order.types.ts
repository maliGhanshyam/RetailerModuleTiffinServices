// export interface Column {
//     id: 'name' | 'code' | 'population' | 'size' | 'density';
//     label: string;
//     minWidth?: number;
//     align?: 'right';
//     format?: (value: number) => string;
//   }

export interface ResponseApi{
  statusCode:number;
  success:boolean;
  message:string;
}