using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyProject.Data.Migrations
{
    public partial class CapitalLetter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "startJob",
                table: "Jobs",
                newName: "StartJob");

            migrationBuilder.RenameColumn(
                name: "isAdmin",
                table: "Jobs",
                newName: "IsAdmin");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartJob",
                table: "Jobs",
                newName: "startJob");

            migrationBuilder.RenameColumn(
                name: "IsAdmin",
                table: "Jobs",
                newName: "isAdmin");
        }
    }
}
