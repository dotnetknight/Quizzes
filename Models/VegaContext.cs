using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Quizzes.Models
{
    public partial class VegaContext : DbContext
    {
        public VegaContext()
        {
        }

        public VegaContext(DbContextOptions<VegaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<QCategories> QCategories { get; set; }
        public virtual DbSet<QQuestion> QQuestion { get; set; }
        public virtual DbSet<QQuizzes> QQuizzes { get; set; }
        public virtual DbSet<QUsers> QUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<QCategories>(entity =>
            {
                entity.ToTable("Q-Categories");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<QQuestion>(entity =>
            {
                entity.ToTable("Q-Question");

                entity.Property(e => e.Answer1)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Answer2)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Answer3)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CorrectAnswer)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnType("text");
            });

            modelBuilder.Entity<QQuizzes>(entity =>
            {
                entity.ToTable("Q-Quizzes");

                entity.Property(e => e.OwnerId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<QUsers>(entity =>
            {
                entity.ToTable("Q-Users");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(88)
                    .IsUnicode(false);
            });
        }
    }
}
