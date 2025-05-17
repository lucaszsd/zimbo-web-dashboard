"use client"


import { ColumnDef } from "@tanstack/react-table";

 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Account = {  
//   status: "pending" | "processing" | "success" | "failed"
  
  createdAt?: string;
  accountName: string;
  pixKey: string;
  institutionName: string;
  fiatAccountType: string;
  fiatAccountSchema: string;
  country?: string;
  // transactionType: "ADD" | "REMOVE"
  // points: number
  // id: string
  // buy_total: number
  // sell_total: number
  // buy_currency: string
  // sell_currency: string
}



export const columns: ColumnDef<Account>[] = [
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
  {
    accessorKey: "fiatAccountId",
    header: "Account ID",
    // cell: ({ row }) => {
    //   return new Date(row.original.createdAt).toLocaleDateString() + ' - ' + new Date(row.original.createdAt).toLocaleTimeString()
    // }
  },
  // },
  {
    accessorKey: "accountName",
    header: "Account name",
    // cell: ({ row }) => {
    //   return row.original.buy_total ? row.original.buy_total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) : 'R$ 0,00'
    // }
  },
  {
    accessorKey: "pixKey",
    header: "Pix Key",
  },
  // {
  //   accessorKey: "institutionName",
  //   header: "Institution name",
    
  // },
  // {
  //   accessorKey: "fiatAccountType",
  //   header: "Institution name", 
  // },
 
  {
    accessorKey: "country",
    header: "Country", 
    cell: ({ row }) => {
      return (<img src={`/flags/BR.svg`} alt={row.original.country} className="size-5 rounded-full" />)
    }
  }, 


  // {
  //   accessorKey: "transactionType",
  //   header: "Tipo de transação",
  //   cell: ({ row }) => {
  //     return row.original.transactionType == 'ADD' ? <ArrowUp color="green" /> : <ArrowDown color="red"/>
  //     // return <Icon as={row.original.transactionType == 'ADD' ? ArrowUpDown : ArrowDown} />
  //   }
  // },
  
  // {
  //   accessorKey: "points",
  //   header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Pontos
  //           <ArrowUpDown className="w-4 h-4 ml-2" />
  //         </Button>
  //       )
  //     },
  // },
  // {
  //   id: "actions",
  //   header: 'Ações',
  //   cell: ({ row }) => {
  //     const payment = row.original
 
      
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="w-8 h-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="w-4 h-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Ações</DropdownMenuLabel>
  //           {/* <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem> */}
  //           {/* <DropdownMenuSeparator /> */}
  //           <Link href = {`/dashboard/clients/edit/${payment.cpf}`}>
  //               <DropdownMenuItem>Editar</DropdownMenuItem>
  //           </Link>
  //           {/* <DropdownMenuItem onClick={() => {}}>Excluir</DropdownMenuItem> */}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]
