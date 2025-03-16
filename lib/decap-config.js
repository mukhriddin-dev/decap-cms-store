// This file would be used to configure Decap CMS
// It would typically be placed in the public/admin directory in an Astro project

export const decapConfig = {
  backend: {
    name: "git-gateway",
    branch: "main",
  },
  media_folder: "public/images",
  public_folder: "/images",
  collections: [
    {
      name: "categories",
      label: "Kategoriyalar",
      folder: "src/content/categories",
      create: true,
      slug: "{{slug}}",
      fields: [
        { label: "Kategoriya nomi", name: "title", widget: "string" },
        { label: "Kategoriya rasmi", name: "image", widget: "image" },
      ],
    },
    {
      name: "products",
      label: "Mahsulotlar",
      folder: "src/content/products",
      create: true,
      slug: "{{slug}}",
      fields: [
        { label: "Mahsulot nomi", name: "name", widget: "string" },
        { label: "Asosiy rasm", name: "main_image", widget: "image" },
        {
          label: "Qo'shimcha rasmlar",
          name: "gallery",
          widget: "list",
          field: { label: "Rasm", name: "image", widget: "image" },
        },
        { label: "Narx", name: "price", widget: "string" },
        { label: "Tavsif", name: "description", widget: "markdown" },
        {
          label: "Kategoriya",
          name: "category",
          widget: "relation",
          collection: "categories",
          value_field: "{{slug}}",
          display_fields: ["title"],
          search_fields: ["title"],
        },
      ],
    },
  ],
}

