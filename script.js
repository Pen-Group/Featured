const projectsDiv = document.getElementById("pageElements");

const addProject = (projectData) => {
    let projectDiv = document.createElement("div");

    projectDiv.className = "extension";

    projectDiv.style.backgroundColor = "var(--background-3)";
    projectDiv.style.borderRadius = "8px";
    projectDiv.style.lineHeight = "0.4"

    projectDiv.innerHTML = `
        <div style="position: relative; width:calc(100% - 16px); margin: 8px; border-radius:8px;">
            <img style="width:100%" src="Projects/${encodeURIComponent(projectData.Author)}/${encodeURIComponent(projectData.Name)}/Thumb.png">
            <div class="hoverBOX" id="HoverBox_${projectData.Name}"></div>
        </div>
        <h2 style="color:var(--text-1);">${projectData.Name}</h2>
        <p>By:${(projectData["Author-Link"]) ? `<a href="${projectData["Author-Link"]}">${projectData.Author}</a>` : projectData.Author}</p>
        <p style="line-height:1;">${projectData.Description}</p>
    `;

    projectsDiv.appendChild(projectDiv);

    const hoverBox = document.getElementById(`HoverBox_${projectData.Name}`);

    if (projectData["In-Site"]) {
        const linkButton = document.createElement("a");
        linkButton.href = `${window.location.href}/Projects/${encodeURIComponent(projectData.Author)}/${encodeURIComponent(projectData.Name)}`;
        linkButton.innerText = "Open Project";
        linkButton.style.color = "#ffffff";
        linkButton.style.backgroundColor = "#a34cff";

        hoverBox.appendChild(linkButton);
    }

    if (projectData["External-Links"]) {
        Object.keys(projectData["External-Links"]).forEach(Link => {
            const link = projectData["External-Links"][Link];

            const linkButton = document.createElement("a");
            linkButton.href = link;
            linkButton.innerText = `View on ${Link}`;
            linkButton.style.color = "#ffffff";
            
            if (Link == "Scratch") {
                linkButton.innerText = `Original Version`;
            }
            linkButton.className = `hoverBOX-${Link}`;

            hoverBox.appendChild(linkButton);
        })
    }

    if (projectData["Project-File"]) {
        const linkButton = document.createElement("a");
        linkButton.href = `https://turbowarp.org/?project_url=${window.location.href}/Projects/${encodeURIComponent(projectData.Author)}/${encodeURIComponent(projectData.Name)}/${projectData["Project-File"]}`;
        linkButton.innerText = "Open in TurboWarp";
        linkButton.style.color = "#ffffff";
        linkButton.style.backgroundColor = "#ff6666";

        hoverBox.appendChild(linkButton);
    }
}

fetch("FeaturedProjects.json")
  .then((response) => response.text())
  .then((text) => {
    projectsDiv.innerHTML = ``;
    let Projects = JSON.parse(text);
    console.log(Projects);

    for (let projectID = 0; projectID < Projects.length; projectID++) {
      console.log(Projects[projectID]);
      addProject(Projects[projectID]);
    }
  });
