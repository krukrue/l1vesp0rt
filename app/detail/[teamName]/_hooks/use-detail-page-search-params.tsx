import { useParams, useSearchParams } from "next/navigation";
import { SearchTypeFilterKey } from "@/lib/api/search/common";


export function useDetailPageSearchParams() {
    const params = useParams<{ teamName: string }>();
    const teamName = params.teamName;

    const searchParams = useSearchParams();
    const teamId = searchParams.get("id");
    const filter = searchParams.get("filter") as SearchTypeFilterKey | null;

    return { teamName, teamId, filter };
}