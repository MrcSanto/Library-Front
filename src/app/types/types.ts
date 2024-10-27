export interface Categoria {
    categoriaId: number;
    nome: string;
    descricao: string;
}

export interface Book {
    bookId: number;
    nome: string;
    autor: string;
    isbn: number;
    paginas: number;
    restantes: number;
    qtdEmprestimos: number;
    dataAdd : Date;
    categoria: Categoria;
}