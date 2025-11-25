export const ONBOARDING_TEMPLATES: Record<string, any> = {
  estudiante: {
    categories: [
      { name: "Estudios", color: "#4f46e5" },
      { name: "Exámenes", color: "#1d4ed8" },
    ],
    tasks: [
      {
        title: "Organizar horarios de estudio",
        category: "Estudios",
        priority: "medium",
      },
      {
        title: "Preparar examen final",
        description: "Repasar capítulos 1 al 5",
        category: "Exámenes",
        remindDaysBefore: 3,
      },
    ],
  },

  ama_casa: {
    categories: [
      { name: "Hogar", color: "#16a34a" },
      { name: "Compras", color: "#15803d" },
    ],
    tasks: [
      {
        title: "Organizar limpieza semanal",
        category: "Hogar",
      },
      {
        title: "Lista de compras",
        category: "Compras",
        remindEveryMonths: 1,
      },
    ],
  },

  mascotas: {
    categories: [
      { name: "Mascotas", color: "#f97316" },
      { name: "Veterinaria", color: "#ea580c" },
    ],
    tasks: [
      {
        title: "Paseo diario",
        category: "Mascotas",
        priority: "low",
      },
      {
        title: "Desparasitación",
        description: "Cada 5 meses",
        category: "Veterinaria",
        remindEveryMonths: 5,
      },
    ],
  },
};
