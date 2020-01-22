package com.tyss.ehub.dao;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.tyss.ehub.dto.Billable;
import com.tyss.ehub.dto.ClientsInfo;

@Repository
public class BillableImpl implements Billabledao {

	@PersistenceUnit
	private EntityManagerFactory emf;

	@Override
	public boolean insert(Billable bill) {
	
		EntityManager manager = emf.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		try {
			transaction.begin();
			manager.persist(bill);
			transaction.commit();
			manager.close();
			return true;
		} catch (Exception e) {
			transaction.rollback();
			e.printStackTrace();
			return false;
		}
		
	}

	@Override
	public boolean update(Billable empBill) {
		EntityManager manager = emf.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		Billable empBill1 = manager.find(Billable.class, empBill.getEmployeeId());
		if (empBill1 == null) {
			return false;
		}
		transaction.begin();
		empBill1.setEmployeeId(empBill.getEmployeeId());
		empBill1.setContractEndDate(empBill.getContractEndDate());
		empBill1.setDeployementDate(empBill.getDeployementDate());
		empBill1.setRateCardPerMonth(empBill.getRateCardPerMonth());
		empBill1.setStack(empBill.getStack());
		empBill1.setYoe(empBill.getYoe());
		transaction.commit();
		manager.close();
		return true;
	}

	@Override
	public List<Billable> getAllBillable() {
		
		EntityManager manager = emf.createEntityManager();
		List<Billable> list = null;
		try {
		String get = "from Billable";
		Query<Billable> query = (Query) manager.createQuery(get);
		list = query.getResultList();
		if (list == null) {
			return null;
		}
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			manager.close();
		}
	
		return list;
	}

	@Override
	public boolean delete(int bId) {
		EntityManager manager = emf.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		Billable bill1 = manager.find(Billable.class, bId);
		if (bill1 == null) {
			return false;
		}
		transaction.begin();
		manager.remove(bill1);
		transaction.commit();
		manager.close();
		return true;
	}
	
	public HashSet<String> getBillable() {	
		HashSet<String> hs = null;
		EntityManager manager = emf.createEntityManager();
         try {
		String get = "select stack from Billable";
		Query<String> query = (Query) manager.createQuery(get);
		List<String> list = query.getResultList();
	    hs = new HashSet<String>(list);
		
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			manager.close();
		}
		return hs;
		
	}

	@Override
	public Map<String, Integer> getCountStack() {
		Query<Object> queryObject = null;
		List<Object> commonlist = null;
		Iterator<Object> invItr = null;
		Object[] commonArray = null;
		Map<String, Integer> map = null;
		EntityManager manager = emf.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		try {
		String queryString="select stack, count(employeeId) from Billable group by stack";
		queryObject = (Query) manager.createQuery(queryString);
		commonlist = queryObject.list();
		invItr = commonlist.iterator();
		map = new HashMap<String, Integer>();
		while (invItr.hasNext()) {
			commonArray = (Object[]) invItr.next();
			if (commonArray[0] != null && commonArray[1] != null)
				map.put(commonArray[0].toString(),
						Integer.parseInt(commonArray[1].toString()));
			if(map==null) {		
				return null;	
				}
		}
		
		}catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
		}finally {
			manager.close();
		}
		
		return map;
	}

	@Override
	public HashSet<Integer> getExperinceList() {
		javax.persistence.Query query = null;
		List<Integer> list = null;
		HashSet<Integer> hs= null;
		EntityManager manager = emf.createEntityManager();
        try {
		String get = "select yoe from Billable";
		 query =  manager.createQuery(get);
		 list = query.getResultList();
		 hs = new HashSet<Integer>(list);
		
        }catch (Exception e) {
			e.printStackTrace();
		}finally {
			manager.close();
		}
		
		return hs;
	}

	@Override
	public Map<Integer, Integer> getExpCountMap() {
		Query<Object> queryObject = null;
		List<Object> commonlist = null;
		Iterator<Object> invItr = null;
		Object[] commonArray = null;
		Map<Integer, Integer> map = null;
		EntityManager manager = emf.createEntityManager();
		
		try {
			String queryString="select yoe, count(employeeId) from Billable group by yoe";
			queryObject = (Query) manager.createQuery(queryString);
			commonlist = queryObject.list();
			invItr = commonlist.iterator();
			map = new HashMap<Integer, Integer>();
			while (invItr.hasNext()) {
				commonArray = (Object[]) invItr.next();
				if (commonArray[0] != null && commonArray[1] != null)
					map.put(Integer.parseInt(commonArray[0].toString()),
							Integer.parseInt(commonArray[1].toString()));
			}
			
			
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			manager.close();
		}
		if(map==null) {		
			return null;	
			}
		return map;
	}
	
}