
export interface QAPair {
  question: string;
  answer: string;
  citations?: string;
}

export interface DocumentData {
  url: string;
  downloadUrl: string;
  pathname: string;
  contentType: string;
  contentDisposition: string;
}

export interface ProcessRequest {
  chatbotId: string;
  websiteUrls?: string[];
  qandaData?: QAPair[];
  documents?: DocumentData[];
  textContent?: string[];
}




export interface DatasourceResponse {
    success: boolean;
    insertedCount: number;
    datasourceIds: string[];
  }
  
  export interface DeleteKnowledgeResponse {
    success: boolean;
    message: string;
  }
  
  export interface DataSourceItem {
    id: string;
    // Backend-mapped value (legacy + new variants).
    // Examples seen: "Website", "Document", "URL", "DOCUMENT", "QNA", "TXT", ...
    type: string;
    name: string;
    // Usage status (backend enum-ish, but keep legacy to match backend mapping)
    status: string;
    // Training/ingestion status (backend enum-ish, but keep legacy to match backend mapping)
    ingestionStatus: string;
    sourceDetails: any;
    createdAt: string | Date | null;
    citation: string | null;
  }
  
  export interface FetchDataSourcesResponse {
    success: boolean;
    data: DataSourceItem[];
  }
  
  export interface AddCitationRequest {
    chatbotId: string;
    dataSourceId: string;
    citation: string;
  }
  
  export interface AddCitationResponse {
    success: boolean;
    message: string;
    data: {
      id: string;
      citation: string;
      updatedEmbeddingsCount: number;
    };
  }
  
  export interface EmbeddingItem {
    id: string;
    text: string;
    topic: string;
  }
  
  export interface FetchEmbeddingsResponse {
    success: boolean;
    data: EmbeddingItem[];
  }

