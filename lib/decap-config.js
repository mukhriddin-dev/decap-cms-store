export const decapConfig = {
  backend: {
    name: "github",
    branch: "main",
    auth_endpoint: "https://novotoys-catalogs-app.vercel.app/admin",
  },
  media_folder: "public/images",
  public_folder: "/images",
  collections: [
    {
      name: "categories",
      label: "Kategoriyalar",
      folder: "content/categories",
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
      folder: "content/products",
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
          value_field: "title",
          display_fields: ["title"],
          search_fields: ["title"],
        },
      ],
    },
  ],
}
