import { getProjects, getTeamMembers, getContactQueries } from "@/actions";
import { DashboardClient } from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const [projectsRes, teamRes, queriesRes] = await Promise.all([
        getProjects(),
        getTeamMembers(),
        getContactQueries(),
    ]);

    return (
        <DashboardClient
            projectsCount={projectsRes.data?.length || 0}
            teamCount={teamRes.data?.length || 0}
            queriesCount={queriesRes.data?.length || 0}
            newQueriesCount={queriesRes.data?.filter((q) => q.status === "new").length || 0}
            recentQueries={queriesRes.data?.slice(0, 5) || []}
        />
    );
}
