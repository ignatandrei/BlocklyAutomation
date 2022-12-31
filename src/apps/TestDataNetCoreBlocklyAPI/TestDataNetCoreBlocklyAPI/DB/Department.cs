
namespace TestDataNetCoreBlocklyAPI.DB;

public partial class Department
{
    public Department()
    {
        Employee = new HashSet<Employee>();
    }

    [Key]
    [Column("IDDepartment")]
    public long Iddepartment { get; set; }
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = "";

    [InverseProperty("IddepartmentNavigation")]
    public virtual ICollection<Employee> Employee { get; set; }
}
