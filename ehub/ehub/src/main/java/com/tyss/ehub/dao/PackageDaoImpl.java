package com.tyss.ehub.dao;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaQuery;

import org.hibernate.Session;
import org.hibernate.query.*;

import org.springframework.stereotype.Repository;

import com.tyss.ehub.dto.ClientsInfoStatusCode;
import com.tyss.ehub.dto.PackageBillable;
import com.tyss.ehub.dto.PackageResponse;

@Repository
public class PackageDaoImpl implements PackageDao {

	@PersistenceUnit
	private EntityManagerFactory emf;

	@Override
	public boolean addPackage(PackageBillable pakg) {
		EntityManager manager = emf.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		try {
			transaction.begin();
			manager.persist(pakg);
			transaction.commit();
			return true;
		} catch (Exception e) {
			transaction.rollback();
			e.printStackTrace();
			return false;
		}finally {
			manager.close();
		}
	}

	@Override
	public boolean removePackage(int pakgId) {
		EntityManager manager = emf.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		PackageBillable pakg = manager.find(PackageBillable.class, pakgId);
		if (pakg == null) {
			return false;
		}
		transaction.begin();
		manager.remove(pakg);
		transaction.commit();
		manager.close();
		transaction.rollback();
		return true;
	}

	@Override
	public List<PackageBillable> getAllPackage() {
		Query query = null;
		EntityManager manager = emf.createEntityManager();
		List<PackageBillable> list = null;
		try {
		String get = "from PackageBillable";
		 query = (Query) manager.createQuery(get);
		 list = query.getResultList();
		if (list != null) 
			return list;
		
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}finally {
			manager.close();
		}
		
		return list;
	}



	@Override
	public boolean updatePackage(PackageBillable pakg) {
		EntityManager manager = emf.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		try {
		PackageBillable pakBillable = manager.find(PackageBillable.class, pakg.getPackageId());
		if(pakBillable!=null) {
			transaction.begin();
			pakBillable.setPackageId(pakg.getPackageId());
			pakBillable.setDopByClient(pakg.getDopByClient());
			pakBillable.setDopByTy(pakg.getDopByTy());
			pakBillable.setPaymentByClient(pakg.getPaymentByClient());
			pakBillable.setPaymentByTy(pakg.getPaymentByTy());
			transaction.commit();
			return true;
		}
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			manager.close();
		}
		return false;
	}

	@Override
	public PackageResponse getRevenuDeatils() {
		Query queryObject1 = null;
		List<Integer> commonlist = null;
		List<Object> commonlist2 = null;
		Iterator<Object> invItr = null;
		Object[] commonArray = null;
		EntityManager manager = emf.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		HashSet<Integer> yearList = null;
		PackageResponse responce = null;
		Map<Integer, Double> map = null;
		transaction.begin();
		try {
		String queryString="select year(deployementDate) from Billable";
		queryObject1 =  manager.createQuery(queryString);
		commonlist =  queryObject1.getResultList();
		responce = new PackageResponse();
		yearList = new HashSet<Integer>(commonlist);
		responce.setYearList(yearList);
		
		//String queryString2="select year(deployementDate),(SUM(paymentByClient)) - (SUM(paymentByTy)) as profit from  PackageBillable p, Billable b where p.empId=b.employeeId GROUP BY year(deployementDate)";
		queryObject1 = manager.createNativeQuery("select year(deployementDate),(SUM(paymentByClient)) - (SUM(paymentByTy)) as profit from  PackageBillable p, Billable b where p.empId=b.employeeId GROUP BY year(deployementDate)");
		commonlist2 = queryObject1.getResultList();
		invItr = commonlist2.iterator();
		map = new HashMap<Integer, Double>();
		while (invItr.hasNext()) {
			commonArray = (Object[]) invItr.next();
			if (commonArray[0] != null && commonArray[1] != null)
				map.put(Integer.parseInt(commonArray[0].toString()),
						Double.parseDouble(commonArray[1].toString()));
		}
		responce.setRevenuMap(map);
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			manager.close();
		}
		
		transaction.commit();
		return responce;
	}
	
	
	public Double overAllProfit() {
		Query queryObject = null;
		EntityManager manager = emf.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		Double profit = 0d;
		List<Double> commonlist = null;
		
		
		try {
			String queryString="select SUM(paymentByClient) - SUM(paymentByTy) as profit from PackageBillable";
			queryObject =  manager.createQuery(queryString);
			commonlist = queryObject.getResultList();
			if(!commonlist.isEmpty()) {
			profit = commonlist.get(0);
			
			}
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			manager.close();
		}
		
		return profit;
	}
}
