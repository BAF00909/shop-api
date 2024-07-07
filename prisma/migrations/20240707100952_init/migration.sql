-- CreateTable
CREATE TABLE "Employees" (
    "Id" SERIAL NOT NULL,
    "FirstName" TEXT NOT NULL,
    "SecondName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Birthday" DATE NOT NULL,
    "StartDate" DATE NOT NULL,
    "FinishDate" DATE,
    "PositionId" INTEGER NOT NULL,

    CONSTRAINT "PK_Employees" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "OverdueProducts" (
    "Id" SERIAL NOT NULL,
    "CreateDate" TIMESTAMPTZ(6) NOT NULL,
    "ProductOverdueId" INTEGER NOT NULL,
    "EmployeeDecommisionId" INTEGER NOT NULL,

    CONSTRAINT "PK_OverdueProducts" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Positions" (
    "Id" SERIAL NOT NULL,
    "PositionName" TEXT NOT NULL,

    CONSTRAINT "PK_Positions" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ProductGroups" (
    "Id" SERIAL NOT NULL,
    "GroupName" TEXT NOT NULL,

    CONSTRAINT "PK_ProductGroups" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Products" (
    "Id" SERIAL NOT NULL,
    "Art" INTEGER NOT NULL,
    "ProductName" TEXT NOT NULL,
    "DateIn" TIMESTAMPTZ(6) NOT NULL,
    "Count" INTEGER NOT NULL,
    "Cost" DECIMAL NOT NULL,
    "ProductGroupId" INTEGER NOT NULL,
    "SupplyId" INTEGER NOT NULL,

    CONSTRAINT "PK_Products" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Providers" (
    "Id" SERIAL NOT NULL,
    "ProviderName" TEXT NOT NULL,

    CONSTRAINT "PK_Providers" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ReasonsReturn" (
    "Id" SERIAL NOT NULL,
    "GroupName" TEXT NOT NULL,

    CONSTRAINT "PK_ReasonsReturn" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ReturnedProducts" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMPTZ(6) NOT NULL,
    "SoltProductId" INTEGER NOT NULL,
    "ReasonReturnId" INTEGER NOT NULL,
    "EmployeeGetterId" INTEGER NOT NULL,

    CONSTRAINT "PK_ReturnedProducts" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "SoltProducts" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMPTZ(6) NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "EmployeeId" INTEGER NOT NULL,

    CONSTRAINT "PK_SoltProducts" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Supplies" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMPTZ(6) NOT NULL,
    "ProviderId" INTEGER NOT NULL,
    "EmployeeId" INTEGER NOT NULL,

    CONSTRAINT "PK_Supplies" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "__EFMigrationsHistory" (
    "MigrationId" VARCHAR(150) NOT NULL,
    "ProductVersion" VARCHAR(32) NOT NULL,

    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

-- CreateIndex
CREATE INDEX "IX_Employees_PositionId" ON "Employees"("PositionId");

-- CreateIndex
CREATE INDEX "IX_OverdueProducts_EmployeeDecommisionId" ON "OverdueProducts"("EmployeeDecommisionId");

-- CreateIndex
CREATE INDEX "IX_OverdueProducts_ProductOverdueId" ON "OverdueProducts"("ProductOverdueId");

-- CreateIndex
CREATE INDEX "IX_Products_ProductGroupId" ON "Products"("ProductGroupId");

-- CreateIndex
CREATE INDEX "IX_Products_SupplyId" ON "Products"("SupplyId");

-- CreateIndex
CREATE INDEX "IX_ReturnedProducts_EmployeeGetterId" ON "ReturnedProducts"("EmployeeGetterId");

-- CreateIndex
CREATE INDEX "IX_ReturnedProducts_ReasonReturnId" ON "ReturnedProducts"("ReasonReturnId");

-- CreateIndex
CREATE INDEX "IX_ReturnedProducts_SoltProductId" ON "ReturnedProducts"("SoltProductId");

-- CreateIndex
CREATE INDEX "IX_SoltProducts_EmployeeId" ON "SoltProducts"("EmployeeId");

-- CreateIndex
CREATE INDEX "IX_SoltProducts_ProductId" ON "SoltProducts"("ProductId");

-- CreateIndex
CREATE INDEX "IX_Supplies_EmployeeId" ON "Supplies"("EmployeeId");

-- CreateIndex
CREATE INDEX "IX_Supplies_ProviderId" ON "Supplies"("ProviderId");

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "FK_Employees_Positions_PositionId" FOREIGN KEY ("PositionId") REFERENCES "Positions"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OverdueProducts" ADD CONSTRAINT "FK_OverdueProducts_Employees_EmployeeDecommisionId" FOREIGN KEY ("EmployeeDecommisionId") REFERENCES "Employees"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OverdueProducts" ADD CONSTRAINT "FK_OverdueProducts_Products_ProductOverdueId" FOREIGN KEY ("ProductOverdueId") REFERENCES "Products"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "FK_Products_ProductGroups_ProductGroupId" FOREIGN KEY ("ProductGroupId") REFERENCES "ProductGroups"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "FK_Products_Supplies_SupplyId" FOREIGN KEY ("SupplyId") REFERENCES "Supplies"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ReturnedProducts" ADD CONSTRAINT "FK_ReturnedProducts_Employees_EmployeeGetterId" FOREIGN KEY ("EmployeeGetterId") REFERENCES "Employees"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ReturnedProducts" ADD CONSTRAINT "FK_ReturnedProducts_ReasonsReturn_ReasonReturnId" FOREIGN KEY ("ReasonReturnId") REFERENCES "ReasonsReturn"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ReturnedProducts" ADD CONSTRAINT "FK_ReturnedProducts_SoltProducts_SoltProductId" FOREIGN KEY ("SoltProductId") REFERENCES "SoltProducts"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SoltProducts" ADD CONSTRAINT "FK_SoltProducts_Employees_EmployeeId" FOREIGN KEY ("EmployeeId") REFERENCES "Employees"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SoltProducts" ADD CONSTRAINT "FK_SoltProducts_Products_ProductId" FOREIGN KEY ("ProductId") REFERENCES "Products"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Supplies" ADD CONSTRAINT "FK_Supplies_Employees_EmployeeId" FOREIGN KEY ("EmployeeId") REFERENCES "Employees"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Supplies" ADD CONSTRAINT "FK_Supplies_Providers_ProviderId" FOREIGN KEY ("ProviderId") REFERENCES "Providers"("Id") ON DELETE CASCADE ON UPDATE NO ACTION;
