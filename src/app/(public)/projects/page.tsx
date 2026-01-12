import { getProjects } from "@/actions";
import { ProjectsGrid } from "./projects-grid";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProjectsPage() {
    const { data: projects } = await getProjects();

    return <ProjectsGrid initialProjects={projects || []} />;
}
