export default defineContentScript({
  matches: ["*://summer.hackclub.com/shop"],
  async main() {
    console.log("Hello content.");
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/SkyfallWasTaken/SOMPlus@raw/refs/heads/main/remapped-descriptions.json"
    );
    const json = await response.json();

    const grid = document.querySelector(".sm\\:grid");
    if (!grid) {
      throw new Error(`Grid element not found whilst looking at items`);
    }

    for (const child of grid.children) {
      const descriptionEl = child.querySelector("div.mb-4 > p.text-gray-700");
      const purchaseUrl = child.querySelector("form")?.action.trim()!;
      const id = Number(purchaseUrl.replace(/[^0-9]/g, ""));
      if (json[id] && descriptionEl) {
        descriptionEl.innerHTML = json[id];
      }
    }
  },
});
