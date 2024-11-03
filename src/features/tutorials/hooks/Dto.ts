export interface Tutorials {
    items: Tutorial[];
    page: number;
    pageSize: number;
    totalCount: number;
}

export interface Tutorial {
    id: string;
    title: string;
    status: number;
    videoId: string;
}

export interface TutorialDetail {
    id: string;
    title: string;
    description: string;
    status: number;
    videoId: string;
}

export interface UpdateTutorialRequest {
    title: string;
    description: string;
}

export interface CreateTutorialRequest {
    title: string;
    description: string;
    contentLength: number;
}

export interface CreateTutorialResponse extends Tutorial {
    uploadUrl: string;
}

export interface TutorialAutocompleteOption {
    id: string;
    title: string;
}

export interface DetailParams {
    signal: AbortSignal | undefined;
    id: string | undefined;
}

export interface UpdateTutorialParams {
    request: UpdateTutorialRequest;
    id?: string;
}
