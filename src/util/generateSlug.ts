"use strict"


export function generateSlug(text:string):string{
    return text
    .normalize("NFD") // Normaliza os caracteres Unicode
        .toLowerCase() // Converte para minúsculas
        .replace(/[\u0300-\u036F]/g, "") // Remove acentos
        .replace(/[^\w\s-]/g, "") // Remove caracteres especiais exceto letras, números, espaços e hífens
        .replace(/\s+/g, "-") // Substitui espaços por hífens
        .replace(/-+/g, "-"); // 
}