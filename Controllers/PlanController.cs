using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AspnetCoreAng2.Models;

namespace AspnetCoreAng2.Controllers
{
    [Route("api/[controller]")]
    public class PlanController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<string> PlanNameOptions()
        {
            return new List<string> { "HMO Plan Name 1", "PPO Plan Name 2", "Small Business Plan Name 3" };
        }

        [HttpGet("[action]")]
        public SearchCriteriaOptions PlanSearchCriteriaOptions()
        {
            return new SearchCriteriaOptions
            {
                LOBOptions = new List<IdNamePair> { new IdNamePair { Id = 1, Name = "Family Plan" }, new IdNamePair { Id = 2, Name = "Small Business" }, new IdNamePair { Id = 3, Name = "Core" } },
                ProductTypeOptions = new List<IdNamePair> { new IdNamePair { Id = 1, Name = "PPO" }, new IdNamePair { Id = 2, Name = "HMO" }, new IdNamePair { Id = 3, Name = "PSP" } },
                YearOptions = new List<int> { DateTime.Now.Year + 1, DateTime.Now.Year }
            };
        }

        [HttpPost("[action]")]
        public IEnumerable<PlanSearchResult> PlanSearch([FromBody]PlanSearchCriteria planSearchCriteria)
        {
            return new List<PlanSearchResult>
            {
                new PlanSearchResult { Id = 1, IsPlanValidated = true, LOB = "Small Business", Name = "Small Business Plan Name 1", OpportunityDate = new DateTime(2017, 1, 1), ProductType = "HMO"},
                new PlanSearchResult { Id = 2, IsPlanValidated = false, LOB = "Core", Name = "Core Plan Name 1", OpportunityDate = new DateTime(2017, 1, 1), ProductType = "HMO"},
                new PlanSearchResult { Id = 3, IsPlanValidated = true, LOB = "Small Business", Name = "Small Business Plan Name 2", OpportunityDate = new DateTime(2017, 4, 1), ProductType = "PPO"},
                new PlanSearchResult { Id = 4, IsPlanValidated = false, LOB = "Family Plan", Name = "Family Plan Name 1", OpportunityDate = new DateTime(2017, 1, 1), ProductType = "PPO"},
                new PlanSearchResult { Id = 5, IsPlanValidated = true, LOB = "Small Business", Name = "Small Business Plan Name 3", OpportunityDate = new DateTime(2018, 1, 1), ProductType = "PSP"},
                new PlanSearchResult { Id = 6, IsPlanValidated = false, LOB = "Core", Name = "Core Plan Name 2", OpportunityDate = new DateTime(2018, 1, 1), ProductType = "PSP"}
            };
        }
    }
}
