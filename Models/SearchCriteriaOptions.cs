using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetCoreAng2.Models
{
    public class SearchCriteriaOptions
    {
        public List<int> YearOptions { get; set; } = new List<int>();
        public List<IdNamePair> LOBOptions { get; set; } = new List<IdNamePair>();
        public List<IdNamePair> ProductTypeOptions { get; set; } = new List<IdNamePair>();
    }
}
