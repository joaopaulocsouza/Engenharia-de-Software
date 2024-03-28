type home_data = {
    eventos: {
        id: number,
        nome: string,
        valor: number,
        lote: string,
        categoria: number,
        categorias: string[],
        organizador: {
            nome: string,
            imagem: string,
            avaliacao: string
        }
    }[]
    organizacoes: {
        id: string
        nome: string,
        imagem: string,
        avaliacao: string
    }[]
}
