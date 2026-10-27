/* Free Resources Directory for Seniors — client-side search & category filters */
(function () {
  var resources = [];
  var groups = { byCategory: [] };
  var searchInput = document.getElementById("search-input");
  var clearBtn = document.getElementById("clear-search");
  var resultsEl = document.getElementById("results");
  var categoryButtons = document.querySelectorAll('[data-filter-type="category"]');

  var currentCategory = "all";
  var currentQuery = "";

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  function loadResources() {
    return fetch("data/resources.json")
      .then(function (response) {
        if (!response.ok) throw new Error("Failed to load resources data");
        return response.json();
      })
      .then(function (data) {
        resources = data.resources || [];
        groups = data.groups || { byCategory: [] };
        renderCategoryButtons(data.categories || []);
        render();
      })
      .catch(function (err) {
        resultsEl.innerHTML =
          '<div class="empty">Unable to load the resources directory. Please refresh the page.</div>';
        console.error(err);
      });
  }

  function renderCategoryButtons(categories) {
    var container = document.getElementById("category-filters");
    if (!container) return;
    container.innerHTML = "";
    categories.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn" + (cat.id === currentCategory ? " active" : "");
      btn.setAttribute("data-filter-type", "category");
      btn.setAttribute("data-filter-value", cat.id);
      btn.textContent = cat.label;
      btn.addEventListener("click", function () { setCategoryFilter(btn); });
      container.appendChild(btn);
    });
    var allBtn = document.createElement("button");
    allBtn.type = "button";
    allBtn.className = "filter-btn active";
    allBtn.setAttribute("data-filter-type", "category");
    allBtn.setAttribute("data-filter-value", "all");
    allBtn.textContent = "All categories";
    allBtn.addEventListener("click", function () { setCategoryFilter(allBtn); });
    container.insertBefore(allBtn, container.firstChild);
  }

  function resourceIdsForCategory(value) {
    var group = groups.byCategory.find(function (g) { return g.id === value; });
    return group ? new Set(group.toolIds) : null;
  }

  function matchesFilters(resource) {
    if (currentCategory !== "all") {
      var catIds = resourceIdsForCategory(currentCategory);
      if (!catIds || !catIds.has(resource.id)) return false;
    }
    if (currentQuery) {
      var q = currentQuery.toLowerCase();
      var haystack = (resource.name + " " + resource.category + " " + resource.description +
        " " + resource.whoItHelps + " " + resource.howToAccess + " " + resource.cost + " " +
        resource.costDetail + " " + resource.tags.join(" ")).toLowerCase();
      if (haystack.indexOf(q) === -1) return false;
    }
    return true;
  }

  function render() {
    var filtered = resources.filter(matchesFilters);
    resultsEl.innerHTML = "";

    if (filtered.length === 0) {
      resultsEl.innerHTML = '<div class="empty">No resources match your filters. Try clearing the search or changing a category.</div>';
      return;
    }

    var byCategory = {};
    filtered.forEach(function (r) {
      byCategory[r.category] = byCategory[r.category] || [];
      byCategory[r.category].push(r);
    });

    var categoryOrder = (groups.byCategory || []).map(function (g) { return g.id; });
    var orderedCats = categoryOrder.filter(function (c) { return byCategory[c]; });
    Object.keys(byCategory).forEach(function (c) {
      if (orderedCats.indexOf(c) === -1) orderedCats.push(c);
    });

    orderedCats.forEach(function (catId) {
      var catRes = byCategory[catId];
      var catLabel = "";
      var catDesc = "";
      var catGroup = groups.byCategory.find(function (g) { return g.id === catId; });
      if (catGroup) { catLabel = catGroup.label; catDesc = catGroup.description || ""; }

      var section = document.createElement("section");
      section.className = "category-group";

      var countBadge = '<span class="count">' + catRes.length + " resource" + (catRes.length !== 1 ? "s" : "") + "</span>";
      var descHtml = catDesc ? '<p class="desc">' + escapeHtml(catDesc) + "</p>" : "";

      section.innerHTML =
        '<h2>' + escapeHtml(catLabel) + countBadge + "</h2>" + descHtml;

      catRes.forEach(function (resource) {
        var tagsHtml = resource.tags.map(function (t) { return '<span class="tag">' + escapeHtml(t) + "</span>"; }).join("");
        var card = document.createElement("article");
        card.className = "card";
        card.innerHTML =
          '<h2>' + escapeHtml(resource.name) +
          '<span class="cost">' + escapeHtml(resource.cost) + '</span></h2>' +
          '<p class="category-chip">' + escapeHtml(resource.category) + "</p>" +
          '<p class="meta"><strong>Cost:</strong> ' + escapeHtml(resource.costDetail) + "</p>" +
          '<p class="who"><strong>For:</strong> ' + escapeHtml(resource.whoItHelps) + "</p>" +
          '<p class="setup"><strong>How to access:</strong> ' + escapeHtml(resource.howToAccess) + "</p>" +
          '<div class="tags">' + tagsHtml + "</div>" +
          '<div class="actions">' +
          '<a href="' + escapeHtml(resource.link) + '" class="btn" target="_blank" rel="noopener">Official site &rarr;</a>' +
          "</div>";
        section.appendChild(card);
      });

      resultsEl.appendChild(section);
    });
  }

  function setSearch(value) {
    currentQuery = value.trim();
    clearBtn.style.display = currentQuery ? "block" : "none";
    render();
  }

  function setCategoryFilter(btn) {
    currentCategory = btn.getAttribute("data-filter-value");
    updateActive(categoryButtons, btn);
    render();
  }

  function updateActive(group, activeBtn) {
    group.forEach(function (b) {
      b.classList.toggle("active", b === activeBtn);
    });
  }

  searchInput.addEventListener("input", function () { setSearch(this.value); });
  clearBtn.addEventListener("click", function () {
    searchInput.value = "";
    setSearch("");
    searchInput.focus();
  });

  loadResources();
})();
