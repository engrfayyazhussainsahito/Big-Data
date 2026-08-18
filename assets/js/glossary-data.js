window.GLOSSARY_DATA = [
  [
    "ACID",
    "Atomicity, Consistency, Isolation, Durability \u2014 database transaction guarantees that ensure data integrity."
  ],
  [
    "Apache Arrow",
    "A cross-language columnar in-memory data format that eliminates serialization overhead between query engines."
  ],
  [
    "Apache Flink",
    "An open-source, distributed stream processing framework for stateful computations over unbounded and bounded data streams."
  ],
  [
    "Apache Iceberg",
    "A high-performance open table format for huge analytic datasets that provides ACID transactions, snapshot isolation, and schema evolution."
  ],
  [
    "Apache Kafka",
    "A distributed event streaming platform used for high-throughput, fault-tolerant publish-subscribe message logging."
  ],
  [
    "Apache Spark",
    "A unified analytics engine for large-scale distributed data processing supporting SQL, streaming, machine learning, and graph computation."
  ],
  [
    "Bronze Layer",
    "The raw ingestion layer in Medallion Architecture where append-only source records are stored in their native format."
  ],
  [
    "Catalyst Optimizer",
    "Spark SQL's rule-based and cost-based query optimizer that performs query tree rewriting and physical execution planning."
  ],
  [
    "Change Data Capture (CDC)",
    "A design pattern that monitors and captures database mutations (inserts, updates, deletes) from transaction logs."
  ],
  [
    "Columnar Storage",
    "Storing table data organized by columns rather than rows (e.g., Parquet, ORC), drastically accelerating analytical aggregation queries."
  ],
  [
    "Data Contract",
    "A formal, version-controlled agreement between data producers and consumers defining schema, semantics, quality, and SLA guarantees."
  ],
  [
    "Data Lakehouse",
    "An architectural paradigm combining the low-cost, open object storage of Data Lakes with the ACID transactions and performance of Data Warehouses."
  ],
  [
    "Data Mesh",
    "A decentralized architectural approach that treats data as a product owned by domain teams with federated governance."
  ],
  [
    "DataOps",
    "An agile, automated methodology for developing and delivering data pipelines with continuous integration, testing, and observability."
  ],
  [
    "dbt (Data Build Tool)",
    "A transformation tool that lets analytics engineers write modular SQL models with automated tests, docs, and DAG lineage in Git."
  ],
  [
    "Delta Lake",
    "An open-source storage framework that brings ACID transactions and Parquet table optimizations to cloud object storage."
  ],
  [
    "Dimensional Modeling",
    "A database design technique pioneered by Ralph Kimball featuring Fact and Dimension tables in Star or Snowflake schemas."
  ],
  [
    "Event Time",
    "The time at which an event originally occurred at the source device, distinct from the time it was processed by the engine."
  ],
  [
    "Exactly-Once Semantics (EOS)",
    "A stream processing guarantee ensuring each incoming event affects final state exactly once, avoiding duplicates or omissions."
  ],
  [
    "Feature Store",
    "A centralized repository that stores, versions, and serves curated ML features for consistent training and real-time inference."
  ],
  [
    "Gold Layer",
    "The top-tier curated reporting layer in Medallion Architecture containing business-level aggregates and star-schema dimensional tables."
  ],
  [
    "HDFS",
    "Hadoop Distributed File System \u2014 a distributed file storage architecture designed to run on commodity hardware clusters."
  ],
  [
    "Hierarchical Navigable Small World (HNSW)",
    "A state-of-the-art graph-based algorithm for Approximate Nearest Neighbor (ANN) vector search."
  ],
  [
    "Idempotency",
    "The property of an operation whereby performing it multiple times produces the same result as performing it once."
  ],
  [
    "Kafka Topic",
    "A named category or feed to which records are published in Kafka, divided into one or more distributed partitions."
  ],
  [
    "Medallion Architecture",
    "A data design pattern that organizes data into Bronze (raw), Silver (cleansed), and Gold (aggregated) quality layers."
  ],
  [
    "OLAP",
    "Online Analytical Processing \u2014 database systems optimized for read-heavy, multi-column analytical scans and aggregations."
  ],
  [
    "OLTP",
    "Online Transaction Processing \u2014 database systems optimized for high-frequency, low-latency row inserts, updates, and lookups."
  ],
  [
    "Parquet",
    "An open-source columnar storage file format providing efficient compression and encoding schemes for analytics."
  ],
  [
    "RDD (Resilient Distributed Dataset)",
    "The fundamental fault-tolerant, partitioned data abstraction in Apache Spark representing read-only distributed collections."
  ],
  [
    "Reverse ETL",
    "The process of syncing transformed, cleaned data from the central analytical warehouse back into operational business tools (CRMs, ERPs)."
  ],
  [
    "Semantic Layer",
    "A unified business logic abstraction that defines metrics and dimensions in code, ensuring consistent KPIs across all BI tools."
  ],
  [
    "Silver Layer",
    "The conformed, cleaned, and deduplicated layer in Medallion Architecture where schema validation and enrichment take place."
  ],
  [
    "Snowflake Schema",
    "A dimensional modeling variation where dimension tables are normalized into multiple related tables."
  ],
  [
    "Star Schema",
    "A dimensional modeling structure consisting of a central Fact table referencing denormalized Dimension tables."
  ],
  [
    "Vector Database",
    "A specialized database designed to index, store, and query high-dimensional vector embeddings for similarity search and AI applications."
  ],
  [
    "Watermark",
    "A stream processing mechanism that tracks event-time progress and specifies when the system considers all earlier events to have arrived."
  ],
  [
    "YARN",
    "Yet Another Resource Negotiator \u2014 the cluster resource management layer of Apache Hadoop."
  ]
];