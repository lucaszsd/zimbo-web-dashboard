import { toast } from "sonner"

const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success('Copied to clipboard',  {
        richColors: true,
    }) 
    }

export default copyToClipboard