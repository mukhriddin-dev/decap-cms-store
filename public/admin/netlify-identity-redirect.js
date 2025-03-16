// Netlify Identity widget bilan ishlash uchun skript
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/"
      })
    }
  })
}

